import { Request, Response } from "express"
import { PetsService } from "../services/petsService"

const service = new PetsService()

export const listPets = (req: Request, res: Response) => {
    res.status(200).json(service.getPets())
}
export const createPet = async (req: Request, res: Response) => {
    const result = await service.createPet(req.body)
    res.status(200).json(result)
}
export const getPetById = (req: Request, res: Response) => {
}
export const updatePetById = (req: Request, res: Response) => {
}
export const deletePetById = (req: Request, res: Response) => {
}