import { PrismaClient } from "@prisma/client";

const getReviewByID = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    console.warn(`Review with ID ${id} not found.`);
    return null;
  }

  return review;
};

export default getReviewByID;
