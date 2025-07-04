import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const newBooking = await prisma.booking.create({
    data: {
      id: uuidv4(), // pass id inside the "data" object
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return newBooking;
};

export default createBooking;
