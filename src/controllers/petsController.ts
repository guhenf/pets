import { Request, Response } from "express";
import { PetsService } from "../services/petsService";

const service = new PetsService();

export const listPets = async (req: Request, res: Response) => {
  const pets = await service.fetchPets();
  res.status(200).json(pets);
};

export const createPet = async (req: Request, res: Response) => {
  const createdPet = await service.createPet(req.body);
  res.status(201).json(createdPet);
};

export const getPetById = async (req: Request, res: Response) => {
  const petId = parseInt(req.params.petId);
  const pet = await service.getPet(petId);
  res.status(200).json(pet);
};

export const updatePetById = async (req: Request, res: Response) => {
  const petId = parseInt(req.params.petId);
  await service.updatePet(petId, req.body);
  res.status(204).json();
};

export const deletePetById = async (req: Request, res: Response) => {
  const petId = parseInt(req.params.petId);
  await service.deletePet(petId);
  res.status(204).json();
};
