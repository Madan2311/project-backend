import { Request, Response } from "express";
import pool from "../config/database";
import { fetchAllUsers, updateUserRoleService } from "../services/userService";

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      res.status(400).json({ error: "El ID de usuario y el rol son obligatorios" });
      return;
    }
    await updateUserRoleService(userId, role);
    res.status(200).json({ message: "Rol de usuario actualizado correctamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ users });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
