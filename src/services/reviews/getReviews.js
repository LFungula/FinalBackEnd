import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findMany();

  if (!review || review.length === 0) {
    console.warn(`No reviews found.`);
    return null;
  }

  return review;
};

export default getReviews;
