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

  if (!property) {
    console.warn(`Property not found.`);
    return null;
  }

  if (property.length === 0) {
    console.warn(`Property not found.`);
    return null;
  }

  return property;
};

export default getProperties;
