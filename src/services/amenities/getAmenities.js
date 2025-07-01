import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
  const prisma = new PrismaClient();

  return prisma.amenities.findMany({
    where: {
      name,
    },
  });
};

export default getAmenities;
