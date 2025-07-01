import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  const newAmenity = {
    id: uuidv4(),
    name,
  };

  amenitiesData.amenity.push(newAmenity);
};

export default createAmenity;
