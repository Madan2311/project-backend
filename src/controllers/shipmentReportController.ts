import { Request, Response } from "express";
import { fetchShipmentReport } from "../services/shipmentReportService";

export const getShipmentReportController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, status, carrier, page, pageSize } = req.query;
    
    const filters = {
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
      status: status ? String(status) : undefined,
      carrier: carrier ? String(carrier) : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    };

    const report = await fetchShipmentReport(filters);
    res.status(200).json({ shipments: report });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
