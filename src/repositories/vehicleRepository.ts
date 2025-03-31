import pool from "../config/database";

export const createVehicle = async (plateNumber: string, capacity: number, type: string) => {
  const sql = `INSERT INTO vehicles (plate_number, capacity, type) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [plateNumber, capacity, type]);
  return result;
};

export const getVehicles = async () => {
  const sql = "SELECT * FROM vehicles";
  const [rows] = await pool.execute(sql);
  return rows;
};

export const getVehicleByPlate = async (vehicle: string) => {
  const sql = "SELECT * FROM vehicles WHERE plate_number = ?";
  const [rows]: any = await pool.execute(sql, [vehicle]);
  return rows[0];
};

export const countShipmentsForVehicle = async (vehicleId: string) => {
  const sql = "SELECT COUNT(*) as count FROM shipments WHERE vehicle = ?";
  const [rows]: any = await pool.execute(sql, [vehicleId]);
  return rows[0].count;
};
