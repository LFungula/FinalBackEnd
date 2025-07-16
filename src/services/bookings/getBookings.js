import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (userId) => {
  let bookings;

  if (userId) {
    bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
    });
  } else {
    bookings = await prisma.booking.findMany();
  }

  return bookings;
};

export default getBookings;
