import { getAllUsers, updateUserRoleInDB } from "../repositories/userRepository";

export const fetchAllUsers = async () => {
  const users = await getAllUsers();
  return users;
};

export const updateUserRoleService = async (userId: number, role: string) => {
  if (!userId || !role) {
    throw new Error("El ID de usuario y el rol son obligatorios.");
  }
  return await updateUserRoleInDB(userId, role);
};
