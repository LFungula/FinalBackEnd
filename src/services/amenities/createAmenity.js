import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  const newAmenity = await prisma.amenities.create({
    data: {
      id: uuidv4(), // pass id inside the "data" object
      name,
    },
  });

  return newAmenity;
};

export default createAmenity;
