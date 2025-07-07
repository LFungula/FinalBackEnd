import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAmenityByID = async (id) => {
  const amenity = await prisma.amenities.findUnique({ where: { id } });

  return amenity;
};

export default getAmenityByID;
