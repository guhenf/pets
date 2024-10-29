import { Router } from "express";
import {
  createPet,
  deletePetById,
  getPetById,
  listPets,
  updatePetById,
} from "../controllers/petsController";

export const petsRouter = Router()
  .get("/pets", listPets)
  .post("/pets", createPet)
  .get("/pets/:petId(\\d+)", getPetById)
  .put("/pets/:petId(\\d+)", updatePetById)
<<<<<<< HEAD
  .delete("/pets/:petId(\\d+)", deletePetById)
=======
  .delete("/pets/:petId(\\d+)", deletePetById);
>>>>>>> deb59248787b942313a215a567459c13b645ca43
