import { PrismaClient } from "@prisma/client";

const getAmenitiesByID = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.Amenities.findUnique({ where: { id } });

  return amenity;
};

export default getAmenitiesByID;
