import pool from "../config/database";

export const createCarrier = async (name: string, contactInfo: string, vehicleId?: number) => {
  const sql = `INSERT INTO carriers (name, contact_info, vehicle_id) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [name, contactInfo, vehicleId || null]);
  return result;
};

export const getCarriers = async () => {
  const sql = "SELECT * FROM carriers";
  const [rows] = await pool.execute(sql);
  return rows;
};
