import redisClient from '../config/redis';
import { getAdvancedShipmentReport } from "../repositories/shipmentAdvancedReportRepository";

export const fetchAdvancedShipmentReport = async (filters: {
  startDate: string;
  endDate: string;
  carrier?: string;
  page?: number;
  pageSize?: number;
}) => {
  const cacheKey = `shipmentReport:${filters.startDate}:${filters.endDate}:${filters.carrier || 'all'}:${filters.page || 1}:${filters.pageSize || 10}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const report = await getAdvancedShipmentReport(filters);

  await redisClient.setEx(cacheKey, 60, JSON.stringify(report));
  return report;
};
