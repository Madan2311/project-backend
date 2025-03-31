import pool from "../config/database";

export const getAdvancedShipmentReport = async (filters: {
    startDate: string;
    endDate: string;
    carrier?: string;
    page?: number;
    pageSize?: number;
}) => {
    let sql = `
      SELECT 
        c.id AS carrierId,
        c.name AS carrierName,
        AVG(TIMESTAMPDIFF(MINUTE, s.created_at, s.delivered_at)) AS avgDeliveryTime,
        COUNT(s.id) AS completedShipments
      FROM shipments s
      JOIN carriers c ON s.carrier = c.name
      WHERE s.delivered_at IS NOT NULL
        AND s.created_at BETWEEN ? AND ?
    `;
    const params: any[] = [filters.startDate, filters.endDate];

    if (filters.carrier) {
        sql += " AND c.name = ?";
        params.push(filters.carrier);
    }

    sql += " GROUP BY c.id, c.name";

    if (filters.page !== undefined && filters.pageSize !== undefined) {
        const pageSize = Number(filters.pageSize);
        const page = Number(filters.page);
        const offset = (page - 1) * pageSize;
        sql += ` LIMIT ${pageSize} OFFSET ${offset}`;
    }

    const [rows] = await pool.execute(sql, params);
    return rows;
};