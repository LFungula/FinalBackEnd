import { PrismaClient } from "@prisma/client";

const getAmenities = async (name, email) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenities.findMany({
    where: {
      name: {
        contains: name,
      },
      email: { contains: email },
    },
  });

  return amenity;
};

export default getAmenities;
