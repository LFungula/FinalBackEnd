const updateBookingByID = async (id, name) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    console.warn(`Booking with ID ${id} not found.`);
    return null;
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return updatedBooking;
};

export default updateBookingByID;
