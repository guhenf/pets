import { Request, Response } from "express"
import { PetsService } from "../services/petsService"

const service = new PetsService()

export const listPets = async (req: Request, res: Response) => {
    res.status(200).json(await service.getPets())
}
export const createPet = async (req: Request, res: Response) => {
    const result = await service.createPet(req.body)
    res.status(201).json(result)
}
export const getPetById = async (req: Request, res: Response) => {
    const petId = parseInt(req.params.petId)
    res.status(200).json(await service.getPet(petId))
}
export const updatePetById = async (req: Request, res: Response) => {
    const petId = parseInt(req.params.petId)
    const result = await service.updatePet(petId, req.body)
    res.status(204).json(result)
}
export const deletePetById = async (req: Request, res: Response) => {
    res.status(200).json(await service.deletePetById(req.body))
}