import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBookingByID = async (id) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    console.warn(`Booking with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return deletedBooking;
};

export default deleteBookingByID;
