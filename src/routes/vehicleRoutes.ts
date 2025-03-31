import { Router } from "express";
import { createVehicleController, getVehiclesController  } from "../controllers/vehicleController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.post("/", verifyToken, createVehicleController);
router.get("/", verifyToken, getVehiclesController);

export default router;
