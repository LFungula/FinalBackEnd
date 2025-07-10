import { PrismaClient } from "@prisma/client";

const getUserByID = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    console.warn(`User with ID ${id} not found.`);
    return null;
  }

  return user;
};

export default getUserByID;
