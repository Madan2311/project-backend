import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.header("Authorization")?.split(" ")[1];
    if (!token) res.status(401).json({ error: "Acceso denegado, no se ha proporcionado un token valido" });

    try {
        const decoded = jwt.verify(token, SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
}