import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (location, pricePerNight) => {
  const property = await prisma.property.findMany({
    where: {
      location,
      pricePerNight,
    },
  });

  return property;
};

export default getProperties;
