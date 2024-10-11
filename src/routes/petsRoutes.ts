import { Router } from 'express'
import { createPet, deletePetById, getPetById, listPets, updatePetById } from '../controllers/petsController'

export const petsRouter = Router()
.get('/pets', listPets)
.post('/pets', createPet)
.get('/pets/:petId(\\d+)', getPetById)
.delete('/pets/:petId(\\d+)', deletePetById)
.put('/pets/:petId(\\d+)', updatePetById)

