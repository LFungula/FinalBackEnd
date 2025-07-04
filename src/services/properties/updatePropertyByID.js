const updatePropertyByID = async (id, name) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    console.warn(`Property with ID ${id} not found.`);
    return null;
  }

  const updatedProperty = await prisma.property.update({
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

  return updatedProperty;
};

export default updatePropertyByID;
