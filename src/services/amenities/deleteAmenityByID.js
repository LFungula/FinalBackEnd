import { PrismaClient } from "@prisma/client";

const deleteAmenityByID = (id) => {
  const amenityIndex = amenitiesData.amenity.findIndex(
    (amenity) => amenity.id === id
  );

  if (amenityIndex === -1) {
    return null;
  }

  const deletedcategory = amenitiesData.amenity.splice(amenityIndex, 1);

  return deletedcategory;
};

export default deleteAmenityByID;
