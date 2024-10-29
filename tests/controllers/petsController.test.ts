import { Request, Response } from "express";
import * as petsController from "../../src/controllers/petsController";
import { PetsService } from "../../src/services/petsService";

jest.mock("../../src/services/petsService");

describe("PetsController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });
    mockResponse = {
      status: responseStatus,
      json: responseJson,
    };
  });

  describe("listPets", () => {
    it("should return a list of pets with status 200", async () => {
      const mockPets = [
        { id: 1, name: "Fluffy" },
        { id: 2, name: "Buddy" },
      ];
      (PetsService.prototype.fetchPets as jest.Mock).mockResolvedValue(
        mockPets,
      );

      await petsController.listPets(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockPets);
    });
  });

  describe("createPet", () => {
    it("should create a pet and return it with status 201", async () => {
      const mockPet = { id: 1, name: "Fluffy" };
      mockRequest.body = { name: "Fluffy" };
      (PetsService.prototype.createPet as jest.Mock).mockResolvedValue(mockPet);

      await petsController.createPet(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith(mockPet);
    });
  });

  describe("getPetById", () => {
    it("should return a pet by id with status 200", async () => {
      const mockPet = { id: 1, name: "Fluffy" };
      mockRequest.params = { petId: "1" };
      (PetsService.prototype.getPet as jest.Mock).mockResolvedValue(mockPet);

      await petsController.getPetById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockPet);
    });
  });

  describe("updatePetById", () => {
    it("should update a pet and return status 204", async () => {
      mockRequest.params = { petId: "1" };
      mockRequest.body = { name: "Updated Fluffy" };
      (PetsService.prototype.updatePet as jest.Mock).mockResolvedValue(
        undefined,
      );

      await petsController.updatePetById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(204);
      expect(responseJson).toHaveBeenCalled();
    });
  });

  describe("deletePetById", () => {
    it("should delete a pet and return status 204", async () => {
      mockRequest.params = { petId: "1" };
      (PetsService.prototype.deletePet as jest.Mock).mockResolvedValue(
        undefined,
      );

      await petsController.deletePetById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(204);
      expect(responseJson).toHaveBeenCalled();
    });
  });
});
