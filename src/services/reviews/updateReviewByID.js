import { PrismaClient } from "@prisma/client";

const updateReviewByID = async (
  id,
  { userId, propertyId, rating, comment }
) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    console.warn(`Review with ID ${id} not found.`);
    return null;
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return updatedReview;
};

export default updateReviewByID;
