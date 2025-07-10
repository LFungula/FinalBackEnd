import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const newReview = await prisma.review.create({
    data: {
      id: uuidv4(),
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return newReview;
};

export default createReview;
