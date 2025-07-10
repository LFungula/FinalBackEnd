import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
const createProperty = async (
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const newProperty = await prisma.property.create({
    data: {
      id: uuidv4(),
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    },
  });

  return newProperty;
};

export default createProperty;
