import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityByID from "../services/amenities/getAmenityByID.js";
import updatedAmenityByID from "../services/amenities/updatedAmenityByID.js";
import deleteAmenityByID from "../services/amenities/deleteAmenityByID.js";
import createAmenity from "../services/amenities/createAmenity.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const amenities = await getAmenities(name);
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityByID(id);

    if (!amenity) {
      return res
        .status(404)
        .json({ message: `amenity with id ${id} not found` });
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenityByID(id);

    if (!amenity) {
      return res
        .status(404)
        .json({ message: `amenity with id ${id} not found` });
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const amenity = await updatedAmenityByID(id, { name });

    if (!amenity) {
      return res
        .status(404)
        .json({ message: `amenity with id ${id} not found` });
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

export default router;
