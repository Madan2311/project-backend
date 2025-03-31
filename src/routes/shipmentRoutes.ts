import { Router } from "express";
import { createShipmentController, assignShipmentController, getShipmentsController } from "../controllers/shipmentController";
import { getShipmentStatusController, updateShipmentStatusController } from "../controllers/shipmentStatusController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.post("/", verifyToken, createShipmentController);
router.put("/assign", verifyToken, assignShipmentController);
router.get("/", verifyToken, getShipmentsController);
router.get("/:id/status", verifyToken, getShipmentStatusController);
router.put("/:id/status", verifyToken, updateShipmentStatusController);

export default router;