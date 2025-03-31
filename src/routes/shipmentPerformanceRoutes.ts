import { Router } from "express";
import { getShipmentPerformanceController } from "../controllers/shipmentPerformanceController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.get("/report/performance", verifyToken, getShipmentPerformanceController);

export default router;
