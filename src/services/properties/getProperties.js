import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (location, pricePerNight) => {
  const floatPricePerNight = Number(pricePerNight);

  const property = await prisma.property.findMany({
    where: {
      ...(location && { location: { contains: location } }),
      ...(pricePerNight && { pricePerNight: { equals: floatPricePerNight } }),
    },
  });

  return property;
};

export default getProperties;
