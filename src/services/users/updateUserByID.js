const updateUserByID = async (id, name) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    console.warn(`User with ID ${id} not found.`);
    return null;
  }

  const updatedUser = await prisma.user.update({
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

  return updatedUser;
};

export default updateUserByID;
