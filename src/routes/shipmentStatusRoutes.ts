import { Router } from "express";
import { getShipmentStatusController, updateShipmentStatusController } from "../controllers/shipmentStatusController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.get("/:id/status", verifyToken, getShipmentStatusController);
router.put("/:id/status", verifyToken, updateShipmentStatusController);

export default router;
