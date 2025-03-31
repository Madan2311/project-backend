import { getShipmentPerformanceMetrics } from "../repositories/shipmentPerformanceRepository";

export const fetchShipmentPerformanceMetrics = async (filters: {
  startDate: string;
  endDate: string;
  carrier?: string;
  page?: number;
  pageSize?: number;
}) => {
  return await getShipmentPerformanceMetrics(filters);
};
