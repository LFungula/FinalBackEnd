import { PrismaClient } from "@prisma/client";

const getBookings = async (name) => {
  const prisma = new PrismaClient();
  const Booking = await prisma.booking.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return Booking;
};

export default getBookings;
