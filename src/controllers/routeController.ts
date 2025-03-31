import { Request, Response } from "express";
import { registerRoute } from "../services/routeService";
import { fetchRoutes } from "../services/routeService";

export const createRouteController = async (req: Request, res: Response) => {
  try {
    const { name, origin, destination, description } = req.body;
    const result = await registerRoute(name, origin, destination, description);
    res.status(201).json({ message: "Ruta creada correctamente", result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoutesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const routes = await fetchRoutes();
    res.status(200).json({ routes });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
