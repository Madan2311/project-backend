import { getShipmentReport } from "../repositories/shipmentReportRepository";

export const fetchShipmentReport = async (filters: {
  startDate?: string;
  endDate?: string;
  status?: string;
  carrier?: string;
  page?: number;
  pageSize?: number;
}) => {
  return await getShipmentReport(filters);
};
