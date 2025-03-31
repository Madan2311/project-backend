import pool from "../config/database";

export const createRoute = async (name: string, origin: string, destination: string, description?: string) => {
  const sql = `INSERT INTO routes (name, origin, destination, description) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [name, origin, destination, description || null]);
  return result;
};

export const getRoutes = async () => {
  const sql = "SELECT * FROM routes";
  const [rows] = await pool.execute(sql);
  return rows;
};
