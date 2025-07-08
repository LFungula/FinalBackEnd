import { PrismaClient } from "@prisma/client";

const deleteReviewByID = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    console.warn(`Review with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedReview = await prisma.review.delete({
    where: { id },
  });

  return deletedReview; // Return the deleted review
};

export default deleteReviewByID;
