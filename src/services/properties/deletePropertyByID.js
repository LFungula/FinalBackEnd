import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const deletePropertyByID = async (id) => {
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    console.warn(`Property with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedProperty = await prisma.property.delete({
    where: { id },
  });

  return deletedProperty;
};

export default deletePropertyByID;
