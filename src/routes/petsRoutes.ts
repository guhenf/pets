import { Router } from 'express'
import { createPet, deletePetById, getPetById, listPets, updatePetById } from '../controllers/petsController'

const router = Router({mergeParams: true})

router.get('/pets', listPets)
router.get('/pets/:petId', getPetById)
router.post('/pets', createPet)
router.delete('/pets/:petId', deletePetById)
router.put('/pets/:petId', updatePetById)

export default router