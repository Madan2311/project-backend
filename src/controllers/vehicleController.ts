import { Request, Response } from "express";
import { registerVehicle } from "../services/vehicleService";
import { fetchVehicles } from "../services/vehicleService";

export const createVehicleController = async (req: Request, res: Response) => {
  try {
    const { plateNumber, capacity, type } = req.body;
    const result = await registerVehicle(plateNumber, capacity, type);
    res.status(201).json({ message: "Vehículo creado correctamente", result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehiclesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await fetchVehicles();
    res.status(200).json({ vehicles });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
