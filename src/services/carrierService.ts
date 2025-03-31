import { createCarrier } from "../repositories/carrierRepository";
import { getCarriers } from "../repositories/carrierRepository";

export const registerCarrier = async (name: string, contactInfo: string, vehicleId?: number) => {
  if (!name) {
    throw new Error("El nombre es obligatorio");
  }
  return await createCarrier(name, contactInfo, vehicleId);
};

export const fetchCarriers = async () => {
  const carriers = await getCarriers();
  return carriers;
};