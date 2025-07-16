import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingByID from "../services/bookings/getBookingByID.js";
import updateBookingByID from "../services/bookings/updateBookingByID.js";
import deleteBookingByID from "../services/bookings/deleteBookingByID.js";
import createBooking from "../services/bookings/createBooking.js";
import auth from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const checkMissingFields = (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const missingFields = [];

  if (!userId) {
    missingFields.push("userId");
  }
  if (!propertyId) {
    missingFields.push("propertyId");
  }
  if (!checkinDate) {
    missingFields.push("checkinDate");
  }
  if (!checkoutDate) {
    missingFields.push("checkoutDate");
  }
  if (!numberOfGuests) {
    missingFields.push("numberOfGuests");
  }
  if (!totalPrice) {
    missingFields.push("totalPrice");
  }
  if (!bookingStatus) {
    missingFields.push("bookingStatus");
  }

  return missingFields;
};

const checkFieldValues = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const incorrectFields = [];

  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  const existingUserID = await prisma.user.findFirst({ where: { id: userId } });
  if (!existingUserID) {
    incorrectFields.push(
      "userId: userId not found, system is expecting an existing user"
    );
  }

  const existtingPropertyID = await prisma.property.findFirst({
    where: { id: propertyId },
  });
  if (!existtingPropertyID) {
    incorrectFields.push(
      "propertyId: propertyId not found, system is expecting an existing property"
    );
  }
  if (
    existtingPropertyID &&
    existtingPropertyID.maxGuestCount < numberOfGuests
  ) {
    incorrectFields.push(
      "numberOfGuests: numberOfGuests exceeds the maximum guests allowd in the property"
    );
  }

  if (!dateTimeRegex.test(checkinDate)) {
    incorrectFields.push(
      `checkinDate: checkinDate is not formatted correctly. system expects dateTime formatting in ISO 8601 like: '2023-07-20T13:00:00.000Z' /  'yyyy-mm-ddThh:mm:ss.milmilmilZ' `
    );
  }

  if (!dateTimeRegex.test(checkoutDate)) {
    incorrectFields.push(
      `checkoutDate: checkoutDate is not formatted correctly. system expects dateTime formatting in ISO 8601 like: '2023-07-20T13:00:00.000Z' /  'yyyy-mm-ddThh:mm:ss.milmilmilZ' `
    );
  }

  const checkinDateForComparison = new Date(checkinDate); // Convert to Date object for comparison
  const checkoutDateForComparison = new Date(checkoutDate); // Convert to Date object for comparison

  if (checkinDateForComparison >= checkoutDateForComparison) {
    incorrectFields.push(
      "checkinDate: checkinDate must be before checkoutDate"
    );
  }

  if (numberOfGuests && typeof numberOfGuests !== "number") {
    incorrectFields.push(
      "numberOfGuests: datatype of numberOfGuests must be Number"
    );
  }

  if (totalPrice && typeof totalPrice !== "number") {
    incorrectFields.push("totalPrice: datatype of totalPrice must be Number");
  }

  if (
    bookingStatus &&
    !["confirmed", "canceled", "pending", "updated"].includes(bookingStatus)
  ) {
    incorrectFields.push(
      `bookingStatus:bookingStatus must be 'confirmed', 'canceled', 'pending' or updated, bookingStatus now is: '${bookingStatus}'`
    );
  }

  return incorrectFields;
};

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const missingFields = checkMissingFields(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `missing fields ${missingFields}` });
    }

    const incorrectFields = await checkFieldValues(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (incorrectFields.length > 0) {
      return res
        .status(422)
        .json({ message: `Incorrect values for fields: ${incorrectFields}` });
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingByID(id);

    if (!booking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} not found` });
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingByID(id);

    if (!booking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} not found` });
    }
    res.status(200).json({ message: `Booking with id ${id} was deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const incorrectFields = await checkFieldValues(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (incorrectFields.length > 0) {
      return res
        .status(422)
        .json({ message: `Incorrect values for fields: ${incorrectFields}` });
    }

    const booking = await updateBookingByID(
      id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: `booking with id ${id} not found` });
    }
    res.status(200).json({ message: `booking with id ${id} was updated` });
  } catch (error) {
    next(error);
  }
});

export default router;
