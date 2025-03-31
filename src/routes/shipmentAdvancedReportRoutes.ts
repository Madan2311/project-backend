import { Router } from "express";
import { getAdvancedShipmentReportController } from "../controllers/shipmentAdvancedReportController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.get("/report/advanced", verifyToken, getAdvancedShipmentReportController);

export default router;
