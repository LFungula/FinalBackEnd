import { PrismaClient } from "@prisma/client";

const deleteAmenityByID = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.Amenities.findUnique({ where: { id } });

  if (!amenity) {
    console.warn(`Amenity with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedAmenity = await prisma.amenities.delete({
    where: { id },
  });

  return deletedAmenity; // Return the deleted amenity
};

export default deleteAmenityByID;
