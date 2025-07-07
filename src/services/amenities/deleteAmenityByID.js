import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityByID = async (id) => {
  const amenity = await prisma.amenities.findUnique({ where: { id } });

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
