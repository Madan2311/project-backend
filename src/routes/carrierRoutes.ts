import { Router } from "express";
import { createCarrierController, getCarriersController  } from "../controllers/carrierController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.post("/", verifyToken, createCarrierController);
router.get("/", verifyToken, getCarriersController);

export default router;
