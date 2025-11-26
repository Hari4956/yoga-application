import express from "express";
import { userController } from "../controllers/user.Controller";
import { AdminAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", AdminAuth, userController.getUsers);

router.get("/:id", AdminAuth, userController.getUserById);

router.put("/:id", AdminAuth, userController.updateUser);

router.delete("/:id", AdminAuth, userController.deleteUser);

export default router;
