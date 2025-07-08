import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const newBooking = await prisma.booking.create({
    data: {
      id: uuidv4(),
      userId: userId,
      propertyId: propertyId,
      checkinDate: checkinDate,
      checkoutDate: checkoutDate,
      numberOfGuests: Number(numberOfGuests),
      totalPrice: Number(totalPrice),
      bookingStatus: bookingStatus,
    },
  });

  return newBooking;
};

export default createBooking;
