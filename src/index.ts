import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setSocketServerInstance } from './socket';
import authRoutes from "./routes/authRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import routeRoutes from "./routes/routeRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import carrierRoutes from "./routes/carrierRoutes";
import userRoutes from "./routes/userRoutes";
import shipmentReportRoutes from "./routes/shipmentReportRoutes";
import shipmentPerformanceRoutes from "./routes/shipmentPerformanceRoutes";
import shipmentAdvancedReportRoutes from "./routes/shipmentAdvancedReportRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/carriers", carrierRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shipments", shipmentReportRoutes);
app.use("/api/shipments", shipmentPerformanceRoutes);
app.use("/api/shipments", shipmentAdvancedReportRoutes);

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
  transports: ["websocket"]
});
setSocketServerInstance(io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("subscribeShipment", (shipmentId) => {
    console.log("subscribeShipment event with ID:", shipmentId);
    socket.join(`shipment_${shipmentId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});