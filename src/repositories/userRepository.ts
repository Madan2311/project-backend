import pool from "../config/database";

export const createUser = async (name: string, email: string, password: string) => {
    const role = "user";
    const query = "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)";
    const [result] = await pool.execute(query, [name, email, password, role]);
    return result;
}

export const findUserByEmail = async (email: string) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows]: any = await pool.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
}

export const getAllUsers = async () => {
    const sql = "SELECT id, name, email, role FROM users";
    const [rows] = await pool.execute(sql);
    return rows;
};

export const updateUserRoleInDB = async (userId: number, role: string) => {
    const sql = "UPDATE users SET role = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [role, userId]);
    return result;
};