import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyByID = async (id) => {
  const property = await prisma.property.findUnique({ where: { id } });

  return property;
};

export default getPropertyByID;
