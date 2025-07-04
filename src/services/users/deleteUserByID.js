import { PrismaClient } from "@prisma/client";

const deleteUserByID = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    console.warn(`User with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser; // Return the deleted user
};

export default deleteUserByID;
