import { createVehicle } from "../repositories/vehicleRepository";
import { getVehicles } from "../repositories/vehicleRepository";

export const registerVehicle = async (plateNumber: string, capacity: number, type: string) => {
  if (!plateNumber || capacity <= 0 || !type) {
    throw new Error("La placa, la capacidad y el tipo son obligatorios.");
  }
  return await createVehicle(plateNumber, capacity, type);
};


export const fetchVehicles = async () => {
  const vehicles = await getVehicles();
  return vehicles;
}
