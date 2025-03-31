import { Request, Response } from 'express';
import { registerShipment, assignShipmentService, fetchShipmentsByStatus } from '../services/shipmentService';
import { updateShipmentStatus } from "../services/shipmentStatusService";

export const createShipmentController = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;
        const { weight, dimensions, product_type, address } = req.body;

        const result = await registerShipment({ user_id, weight, dimensions, product_type, address });
        const shipmentId = result?.insertId;
        await updateShipmentStatus(shipmentId, "Pending");
        res.status(201).json({
            message: "Envio creado con éxito",
            result
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const assignShipmentController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipmentId, route, carrier, vehicle  } = req.body;
      if (!shipmentId || !route || !carrier || !vehicle) {
        res.status(400).json({ error: "El ID del envío, la ruta, el vehículo y el transportista son obligatorios." });
        return;
      }
      await assignShipmentService(shipmentId, route, carrier, vehicle );
      await updateShipmentStatus(shipmentId, "In transit");
      res.status(200).json({ message: "Envio asignado correctamente" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getShipmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const status = req.query.status as string | undefined;
      const shipments = await fetchShipmentsByStatus(status);
      res.status(200).json({ shipments });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };