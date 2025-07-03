import { PrismaClient } from "@prisma/client";

const getBookingsByID = async (id) => {
  const prisma = new PrismaClient();
  const Booking = await prisma.booking.findUnique({ where: { id } });

  return Booking;
};

export default getBookingsByID;
