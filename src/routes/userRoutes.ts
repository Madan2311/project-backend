import { Router } from "express";
import { updateUserRole, getUsersController } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.put("/role", verifyToken, updateUserRole);
router.get("/", verifyToken, getUsersController);

export default router;
