import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingByID = async (id) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  return booking;
};

export default getBookingByID;
