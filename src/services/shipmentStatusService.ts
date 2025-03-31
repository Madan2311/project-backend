import redisClient from '../config/redis';
import { getSocketServerInstance } from '../socket';
import { updateShipmentStatusInDB } from '../repositories/shipmentRepository';

export const updateShipmentStatus = async (shipmentId: number, newStatus: string): Promise<void> => {
    await updateShipmentStatusInDB(shipmentId, newStatus);
    await redisClient.set(`shipment:${shipmentId}:current`, newStatus);
    await redisClient.lPush(`shipment:${shipmentId}:history`, newStatus);
    const io = getSocketServerInstance();
    console.log(`Emitiendo shipmentStatusUpdated para envío ${shipmentId} con estado ${newStatus}`);
    io.to(`shipment_${shipmentId}`).emit("shipmentStatusUpdated", { shipmentId, newStatus });
};

export const getShipmentStatus = async (shipmentId: number): Promise<{ currentStatus: string; history: string[] }> => {
    const currentStatus = await redisClient.get(`shipment:${shipmentId}:current`) || "Unknown";
    const history = await redisClient.lRange(`shipment:${shipmentId}:history`, 0, -1);
    return { currentStatus, history };
};
