import { PrismaClient } from "@prisma/client";

const deleteBookingByID = async (id) => {
  const prisma = new PrismaClient();
  const Booking = await prisma.booking.findUnique({ where: { id } });

  if (!Booking) {
    console.warn(`Booking with ID ${id} not found for deletion.`);
    return null;
  }

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return deletedBooking; // Return the deleted Booking
};

export default deleteBookingByID;
