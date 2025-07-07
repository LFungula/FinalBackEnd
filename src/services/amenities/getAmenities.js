import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAmenities = async (name) => {
  const amenities = await prisma.amenities.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return amenities;
};

export default getAmenities;
