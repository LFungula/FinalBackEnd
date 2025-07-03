import { PrismaClient } from "@prisma/client";
const patchAmenityByID = async (id, name) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenities.findUnique({ where: { id } });

  if (!amenity) {
    console.warn(`Amenity with ID ${id} not found.`);
    return null;
  }

  const PatchedAmenity = await prisma.amenities.update({
    where: { id },
    data: { name },
  });

  return PatchedAmenity;
};

export default patchAmenityByID;
