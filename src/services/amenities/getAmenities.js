import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenities.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return amenity;
};

export default getAmenities;
