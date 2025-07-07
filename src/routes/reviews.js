import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewByID from "../services/reviews/getReviewByID.js";
import updateReviewByID from "../services/reviews/updateReviewByID.js";
import deleteReviewByID from "../services/reviews/deleteReviewByID.js";
import createReview from "../services/reviews/createReview.js";
//import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
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

router.delete("/:id", async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
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
