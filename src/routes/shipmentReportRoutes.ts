import { Router } from "express";
import { getShipmentReportController } from "../controllers/shipmentReportController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.get("/report", verifyToken, getShipmentReportController);

export default router;
