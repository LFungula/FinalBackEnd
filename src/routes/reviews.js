import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewByID from "../services/reviews/getReviewByID.js";
import updateReviewByID from "../services/reviews/updateReviewByID.js";
import deleteReviewByID from "../services/reviews/deleteReviewByID.js";
import createReview from "../services/reviews/createReview.js";
import auth from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const checkFieldValues = async (userId, propertyId, rating) => {
  const incorrectFields = [];

  const user = await prisma.user.findFirst({ where: { id: userId } });
  if (!user) {
    incorrectFields.push(
      "userId: userId not found, system is expecting an existing user"
    );
  }

  const property = await prisma.property.findFirst({
    where: { id: propertyId },
  });
  if (!property) {
    incorrectFields.push(
      "propertyId: propertyId not found, system is expecting an existing property"
    );
  }

  if (typeof rating !== "number" || rating > 5 || rating < 0) {
    incorrectFields.push(
      "rating: rating must be a Number between or equal to 0 and 5"
    );
  }

  return incorrectFields;
};

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const missingFields = [];

    if (!userId) {
      missingFields.push("userId");
    }
    if (!propertyId) {
      missingFields.push("propertyId");
    }
    if (!rating) {
      missingFields.push("rating");
    }
    if (!comment) {
      missingFields.push("comment");
    }

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `missing fields ${missingFields}` });
    }

    const incorrectFields = await checkFieldValues(userId, propertyId, rating);

    if (incorrectFields.length > 0) {
      return res
        .status(422)
        .json({ message: `Incorrect values for fields: ${incorrectFields}` });
    }

    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewByID(id);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review with id ${id} not found` });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewByID(id);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review with id ${id} not found` });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;

    const incorrectFields = await checkFieldValues(userId, propertyId, rating);

    if (incorrectFields.length > 0) {
      return res
        .status(422)
        .json({ message: `Incorrect values for fields: ${incorrectFields}` });
    }

    const review = await updateReviewByID(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review with id ${id} not found` });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

export default router;
