import pool from "../config/database";

// Función para obtener envíos con filtros avanzados
export const getShipmentReport = async (filters: {
  startDate?: string;
  endDate?: string;
  status?: string;
  carrier?: string;
  page?: number;
  pageSize?: number;
}) => {
  let sql = "SELECT * FROM shipments WHERE 1=1";
  const params: any[] = [];

  if (filters.startDate) {
    sql += " AND created_at >= ?";
    params.push(filters.startDate);
  }
  if (filters.endDate) {
    sql += " AND created_at <= ?";
    params.push(filters.endDate);
  }

  if (filters.status) {
    sql += " AND status = ?";
    params.push(filters.status);
  }

  if (filters.carrier) {
    sql += " AND carrier = ?";
    params.push(filters.carrier);
  }

  if (filters.page && filters.pageSize) {
    const offset = (filters.page - 1) * filters.pageSize;
    sql += " LIMIT ? OFFSET ?";
    params.push(filters.pageSize, offset);
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
};
