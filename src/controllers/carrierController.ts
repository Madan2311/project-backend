import { Request, Response } from "express";
import { registerCarrier } from "../services/carrierService";
import { fetchCarriers } from "../services/carrierService";

export const createCarrierController = async (req: Request, res: Response) => {
  try {
    const { name, contactInfo, vehicleId } = req.body;
    const result = await registerCarrier(name, contactInfo, vehicleId);
    res.status(201).json({ message: "Transportista creado correctamente", result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCarriersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const carriers = await fetchCarriers();
    res.status(200).json({ carriers });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
