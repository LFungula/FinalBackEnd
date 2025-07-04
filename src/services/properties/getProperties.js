import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight: {
        contains: pricePerNight,
      },
    },
  });

  return property;
};

export default getProperties;
