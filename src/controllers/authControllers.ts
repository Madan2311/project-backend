import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        await registerUser(name, email, password);
        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}