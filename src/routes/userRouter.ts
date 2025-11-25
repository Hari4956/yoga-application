import express from "express";
import { userController } from "../controllers/user.Controller";
import { UserJwt } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", UserJwt, userController.getUsers);

router.get("/:id", UserJwt, userController.getUserById);

router.put("/:id", UserJwt, userController.updateUser);

router.delete("/:id", UserJwt, userController.deleteUser);

export default router;
0;
