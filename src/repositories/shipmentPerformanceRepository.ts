import pool from "../config/database";

export const getShipmentPerformanceMetrics = async (filters: {
  startDate: string;
  endDate: string;
  carrier?: string;
  page?: number;
  pageSize?: number;
}) => {
  let sql = `
    SELECT 
      carrier,
      AVG(TIMESTAMPDIFF(MINUTE, created_at, delivered_at)) AS avgDeliveryTime,
      COUNT(*) AS completedShipments
    FROM shipments
    WHERE delivered_at IS NOT NULL
      AND created_at BETWEEN ? AND ?
  `;
  const params: any[] = [filters.startDate, filters.endDate];

  if (filters.carrier) {
    sql += " AND carrier = ?";
    params.push(filters.carrier);
  }

  sql += " GROUP BY carrier";

  if (filters.page && filters.pageSize) {
    const offset = (filters.page - 1) * filters.pageSize;
    sql += " LIMIT ? OFFSET ?";
    params.push(filters.pageSize, offset);
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
};
