const updateReviewByID = async (id, name) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    console.warn(`Review with ID ${id} not found.`);
    return null;
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
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

  return updatedReview;
};

export default updateReviewByID;
