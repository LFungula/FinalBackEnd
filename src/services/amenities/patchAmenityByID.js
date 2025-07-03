import { PrismaClient } from "@prisma/client";
const patchAmenityByID = async (name) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenities.patch({
    id: uuidv4(),
    name,
  });

  return amenity;
};

export default patchAmenityByID;
