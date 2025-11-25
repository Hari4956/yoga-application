import express from "express";
import { aasanaController } from "../controllers/Asana.controller";

const router = express.Router();

router.post("/", aasanaController.createAasana);

router.get("/", aasanaController.getAllAasana);

router.get("/:id", aasanaController.getAasanaById);

router.delete("/:id", aasanaController.deleteAasana);

router.put("/:id", aasanaController.updateAasana);

export default router;
