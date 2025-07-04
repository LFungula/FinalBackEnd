import { PrismaClient } from "@prisma/client";

const getAmenityByID = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenities.findUnique({ where: { id } });

  return amenity;
};

export default getAmenityByID;
