import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatedAmenityByID = async (id, name) => {
  const amenity = await prisma.amenities.findUnique({ where: { id } });

  if (!amenity) {
    console.warn(`Amenity with ID ${id} not found.`);
    return null;
  }

  const updateAmenitiy = await prisma.amenities.update({
    where: { id },
    data: { name },
  });

  if (!updateAmenitiy || updateUser.count === 0) {
    throw new NotFoundError("user", id);
  }

  return {
    updateAmenitiy,
    message: `User with id ${id} was updated!`,
  };
};

export default updatedAmenityByID;
