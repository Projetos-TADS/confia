import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/login", userController.loginUser);
router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
