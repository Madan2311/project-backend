import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "../repositories/userRepository";

dotenv.config();

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return createUser(name, email, hashedPassword);
}

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("El usuario no existe");

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) throw new Error("Credenciales incorrectas");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "2h" });
    return { token, user }
}