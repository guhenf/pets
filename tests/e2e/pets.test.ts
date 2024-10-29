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

  //   // Add more test cases for POST, GET by ID, PUT, and DELETE endpoints
});
