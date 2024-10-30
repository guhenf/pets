// import request from "supertest";
import { Sequelize } from "sequelize";
import { Express } from "express-serve-static-core";
import Pet from "../../src/models/pet";
import { app } from "../../src/index";
import request from "supertest";

describe("Pets API", () => {
  let testSequelize: Sequelize;
  let testApp: Express;

  beforeAll(async () => {
    // Set up in-memory SQLite database
    testSequelize = new Sequelize("sqlite::memory:", {
      logging: false, // disable logging
    });
    // Clone the app to avoid modifying the original
    testApp = app;
    // Initialize the Pet model with the test Sequelize instance
    Pet.init(Pet.getAttributes(), {
      sequelize: testSequelize,
      modelName: "Pet",
    });
    // Sync the model with the database
    await testSequelize.sync({ force: true });
  });

  afterAll(async () => {
    await testSequelize.close();
  });

  beforeEach(async () => {
    await Pet.destroy({ where: {}, truncate: true });
  });

  describe("GET /pets", () => {
    it("should return an empty array when no pets exist", async () => {
      const res = await request(testApp).get("/pets");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("should return all pets", async () => {
      await Pet.create({ name: "Fluffy", age: 2 });
      await Pet.create({ name: "Buddy", age: 3 });

      const res = await request(testApp).get("/pets");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].name).toBe("Fluffy");
      expect(res.body[1].name).toBe("Buddy");
    });
  });

  describe("POST /pets", () => {
    it("should return created pet when successful", async () => {
      const res = await request(testApp)
        .post("/pets")
        .send({ name: "Fluffy", age: 2 });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Fluffy");
    });

    it("should return bad request if trying to add a pet without a name", async () => {
      const res = await request(testApp).post("/pets").send({ age: 2 });
      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /pets", () => {
    it("should delete pet", async () => {
      await Pet.create({ name: "Fluffy", age: 2, id: 1 });

      const res = await request(testApp).delete("/pets/1");
      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it("should bad request to delete nos-existent pet", async () => {
      await Pet.create({ name: "Fluffy", age: 2, id: 1 });

      const res = await request(testApp).delete("/pets/2");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Pet not found" });
    });
  });

  describe("PUT /pets", () => {
    it("should bad request to edit non-existent pet", async () => {
      await Pet.create({ name: "Frederico", age: 16, id: 2 });

      const res = await request(testApp)
        .put("/pets/3")
        .send({ name: "Frederico" });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Pet not found" });
    });

    it("should edit name of the pet when successful", async () => {
      await Pet.create({ name: "Fluffy", age: 2, id: 1 });
      await Pet.create({ name: "Fred", age: 16, id: 2 });

      const res = await request(testApp)
        .put("/pets/2")
        .send({ name: "Frederico" });

      expect(res.status).toBe(204);
      const updatedPet = await Pet.findByPk(2);
      expect(updatedPet?.name).toBe("Frederico");
      // expect(res.body[1].name).toBe("Frederico");
    });

    it("should return bad request when trying to edit something that doesn't exist in pets", async () => {
      await Pet.create({ name: "Frederico", age: 16, id: 2 });

      const res = await request(testApp)
        .put("/pets/2")
        .send({ color: "brown" });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Invalid data" });
    });
  });
});
