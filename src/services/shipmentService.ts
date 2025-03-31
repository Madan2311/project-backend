import { createShipment, assignShipment, getShipments, countShipmentsForCarrier  } from "../repositories/shipmentRepository";
import { getVehicleByPlate, countShipmentsForVehicle } from "../repositories/vehicleRepository";

interface ShipmentInput {
    user_id: number;
    weight: number;
    dimensions: string;
    product_type: string;
    address: string;
}

export const registerShipment = async (data: ShipmentInput) => {
    if (!data.address || data.address.trim() === "") {
        throw new Error("La dirección es obligatoria.");
    }
    if (!data.weight || data.weight <= 0) {
        throw new Error("El peso debe ser mayor a cero.");
    }
    if (!data.dimensions || data.dimensions.trim() === "") {
        throw new Error("La dimensión es obligatoria.");
    }
    if (!data.product_type || data.product_type.trim() === "") {
        throw new Error("El tipo de producto es obligatorio.");
    }
    if (!data.user_id || data.user_id <= 0) {
        throw new Error("El ID de usuario es obligatorio y debe ser mayor a cero.");
    }

    return await createShipment(data);
}

export const assignShipmentService = async (shipmentId: number, route: string, carrier: string, vehicle: string
) => {
    if (!shipmentId || !route || !carrier) {
        throw new Error("El ID del envío, la ruta y el transportista son obligatorios.");
    }

    const vehicleResult: any = await getVehicleByPlate(vehicle);
    if (!vehicleResult) {
      throw new Error("Vehículo no encontrado.");
    }
    
    const shipmentCount: number = await countShipmentsForVehicle(vehicle);
    if (shipmentCount >= vehicleResult.capacity) {
      throw new Error("Se alcanzó la capacidad del vehículo. No se pueden asignar más envíos.");
    }

    const carrierShipmentCount: number = await countShipmentsForCarrier(carrier);
    if (carrierShipmentCount > 0) {
      throw new Error("El transportista ya está asignado a un envío activo.");
    }
    
    return await assignShipment(shipmentId, route, carrier, vehicle);
};

export const fetchShipmentsByStatus = async (status?: string) => {
    return await getShipments(status);
}