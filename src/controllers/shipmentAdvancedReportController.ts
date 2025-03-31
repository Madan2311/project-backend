import { Request, Response } from "express";
import { fetchAdvancedShipmentReport } from "../services/shipmentAdvancedReportService";

export const getAdvancedShipmentReportController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { startDate, endDate, carrier, page, pageSize } = req.query;

        if (!startDate || !endDate) {
            res.status(400).json({ error: "startDate and endDate are required" });
            return;
        }
        const filters = {
            startDate: String(startDate),
            endDate: String(endDate),
            carrier: carrier ? String(carrier) : undefined,
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
        };

        const report = await fetchAdvancedShipmentReport(filters);
        res.status(200).json({ report });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
