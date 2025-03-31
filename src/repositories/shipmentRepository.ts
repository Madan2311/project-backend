import pool from "../config/database";
import { ResultSetHeader } from "mysql2";

interface ShipmentData {
    user_id: number;
    weight: number;
    dimensions: string;
    product_type: string;
    address: string;
}

export const createShipment = async (shipmentData: ShipmentData) => {
    const status = "pending";
    const query = "INSERT INTO shipments (user_id, weight, dimensions, product_type, address, status) VALUES (?,?,?,?,?,?)";
    const [result] = await pool.execute(query, [
        shipmentData.user_id,
        shipmentData.weight,
        shipmentData.dimensions,
        shipmentData.product_type,
        shipmentData.address,
        status
    ]) as [ResultSetHeader, any];
    return result;
}

export const assignShipment = async (shipmentId: number, route: string, carrier: string, vehicle: string) => {
    const newStatus = "In transit";
    const sql = `UPDATE shipments SET route = ?, carrier = ?, vehicle = ?, status = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [route, carrier, vehicle, newStatus, shipmentId]);
    return result;
};

export const getShipments = async (status?: string) => {
    let sql = "SELECT * FROM shipments";
    if (status) {
        sql += " WHERE status = ?";
        const [rows] = await pool.execute(sql, [status]);
        return rows;
    } else {
        const [rows] = await pool.execute(sql);
        return rows;
    }
};

export const countShipmentsForCarrier = async (carrier: string) => {
    const sql = "SELECT COUNT(*) as count FROM shipments WHERE carrier = ? AND status IN ('In transit')";
    const [rows]: any = await pool.execute(sql, [carrier]);
    return rows[0].count;
};

export const updateShipmentStatusInDB = async (shipmentId: number, newStatus: string) => {
    let sql = "";
    let params: any[] = [];
    if (newStatus.toLowerCase() === "delivered") {
      sql = "UPDATE shipments SET status = ?, delivered_at = NOW() WHERE id = ?";
      params = [newStatus, shipmentId];
    } else {
      sql = "UPDATE shipments SET status = ? WHERE id = ?";
      params = [newStatus, shipmentId];
    }
    const [result] = await pool.execute(sql, params);
    return result;
};