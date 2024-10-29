import { PetsService } from "../../src/services/petsService";
import Pet from "../../src/models/pet";
import { NotFoundError } from "../../src/models/exceptions";
import { ZodError } from "zod";

// Mock the Pet model
jest.mock("../../src/models/pet", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("PetsService", () => {
  let petsService: PetsService;

  beforeEach(() => {
    petsService = new PetsService();
    jest.clearAllMocks();
  });

  describe("fetchPets", () => {
    it("should return all pets", async () => {
      const mockPets = [
        { id: 1, name: "Fluffy" },
        { id: 2, name: "Buddy" },
      ];
      (Pet.findAll as jest.Mock).mockResolvedValue(mockPets);

      const result = await petsService.fetchPets();

      expect(result).toEqual(mockPets);
      expect(Pet.findAll).toHaveBeenCalled();
    });
  });

  describe("getPet", () => {
    it("should return a pet if found", async () => {
      const mockPet = { id: 1, name: "Fluffy" };
      (Pet.findByPk as jest.Mock).mockResolvedValue(mockPet);

      const result = await petsService.getPet(1);

      expect(result).toEqual(mockPet);
      expect(Pet.findByPk).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundError if pet is not found", async () => {
      (Pet.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(petsService.getPet(1)).rejects.toThrow(NotFoundError);
      expect(Pet.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe("createPet", () => {
    it("should create a new pet", async () => {
      const newPet = { name: "Fluffy", age: 2, breed: "Persian" };
      const createdPet = { id: 1, ...newPet };
      (Pet.create as jest.Mock).mockResolvedValue(createdPet);

      const result = await petsService.createPet(newPet as Pet);

      expect(result).toEqual(createdPet);
      expect(Pet.create).toHaveBeenCalledWith(newPet);
    });

    it("should throw ZodError if pet data is invalid", async () => {
      const invalidPet = { name: "Fl" }; // Name too short

      await expect(petsService.createPet(invalidPet as Pet)).rejects.toThrow(
        ZodError,
      );
      expect(Pet.create).not.toHaveBeenCalled();
    });
  });

  describe("updatePet", () => {
    it("should update an existing pet", async () => {
      const updatedPet = { id: 1, name: "Fluffy", age: 3 };
      (Pet.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
      (Pet.update as jest.Mock).mockResolvedValue([1]);

      await petsService.updatePet(1, updatedPet as Pet);

      expect(Pet.findByPk).toHaveBeenCalledWith(1);
      expect(Pet.update).toHaveBeenCalledWith(updatedPet, { where: { id: 1 } });
    });

    it("should throw NotFoundError if pet to update is not found", async () => {
      (Pet.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        petsService.updatePet(1, { name: "Fluffy" } as Pet),
      ).rejects.toThrow(NotFoundError);
      expect(Pet.findByPk).toHaveBeenCalledWith(1);
      expect(Pet.update).not.toHaveBeenCalled();
    });

    it("should throw ZodError if update data is invalid", async () => {
      const invalidUpdate = { name: "Fl" }; // Name too short

      await expect(
        petsService.updatePet(1, invalidUpdate as Pet),
      ).rejects.toThrow(ZodError);
      expect(Pet.findByPk).not.toHaveBeenCalled();
      expect(Pet.update).not.toHaveBeenCalled();
    });
  });

  describe("deletePet", () => {
    it("should delete an existing pet", async () => {
      (Pet.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
      (Pet.destroy as jest.Mock).mockResolvedValue(1);

      await petsService.deletePet(1);

      expect(Pet.findByPk).toHaveBeenCalledWith(1);
      expect(Pet.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should throw NotFoundError if pet to delete is not found", async () => {
      (Pet.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(petsService.deletePet(1)).rejects.toThrow(NotFoundError);
      expect(Pet.findByPk).toHaveBeenCalledWith(1);
      expect(Pet.destroy).not.toHaveBeenCalled();
    });
  });
});
