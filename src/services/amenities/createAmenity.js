import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createAmenity = async (name) => {
  const newAmenity = await prisma.amenities.create({
    data: {
      id: uuidv4(),
      name,
    },
  });

  return newAmenity;
};

export default createAmenity;
