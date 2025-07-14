import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingByID from "../services/bookings/getBookingByID.js";
import updateBookingByID from "../services/bookings/updateBookingByID.js";
import deleteBookingByID from "../services/bookings/deleteBookingByID.js";
import createBooking from "../services/bookings/createBooking.js";
import auth from "../middleware/auth.js";

const router = Router();

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

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `missing fields ${missingFields}` });
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
