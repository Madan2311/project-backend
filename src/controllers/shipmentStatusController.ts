import { Request, Response } from "express";
import redisClient from "../config/redis";
import { updateShipmentStatus, getShipmentStatus } from "../services/shipmentStatusService";
import pool from "../config/database";

export const getShipmentStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const shipmentId = Number(req.params.id);
    if (!shipmentId) {
      res.status(400).json({ error: "Shipment ID is required." });
      return;
    }
    
    const [rows]: any = await pool.execute("SELECT id FROM shipments WHERE id = ?", [shipmentId]);
    if (rows.length === 0) {
      res.status(200).json({ 
        shipmentId, 
        currentStatus: "Unknown", 
        history: [] 
      });
      return;
    }

    const { currentStatus, history } = await getShipmentStatus(shipmentId);
    res.status(200).json({ shipmentId, currentStatus, history });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateShipmentStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const shipmentId = Number(req.params.id);
    const { newStatus } = req.body;
    if (!shipmentId || !newStatus) {
      res.status(400).json({ error: "Shipment ID and new status are required." });
      return;
    }
    await updateShipmentStatus(shipmentId, newStatus);
    res.status(200).json({ message: "Shipment status updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
