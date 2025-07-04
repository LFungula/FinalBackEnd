import { PrismaClient } from "@prisma/client";

const deletePropertyByID = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    console.warn(`Property with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedProperty = await prisma.property.delete({
    where: { id },
  });

  return deletedProperty; // Return the deleted Property
};

export default deletePropertyByID;
