import { createRoute } from "../repositories/routeRepository";
import { getRoutes } from "../repositories/routeRepository";

export const registerRoute = async (name: string, origin: string, destination: string, description?: string) => {
  if (!name || !origin || !destination) {
    throw new Error("Todos los campos son obligatorios.");
  }
  return await createRoute(name, origin, destination, description);
};

export const fetchRoutes = async () => {
  const routes = await getRoutes();
  return routes;
};