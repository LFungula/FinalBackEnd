import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const Booking = await prisma.booking.findMany({
    where: {
      userId: {
        contains: userId,
      },
    },
  });

  return Booking;
};

export default getBookings;
