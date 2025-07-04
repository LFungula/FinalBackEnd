import { PrismaClient } from "@prisma/client";

const deleteHostByID = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({ where: { id } });

  if (!host) {
    console.warn(`Host with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedHost = await prisma.host.delete({
    where: { id },
  });

  return deletedHost; // Return the deleted Host
};

export default deleteHostByID;
