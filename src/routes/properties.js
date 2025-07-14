import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyByID from "../services/properties/getPropertyByID.js";
import updatePropertyByID from "../services/properties/updatePropertyByID.js";
import deletePropertyByID from "../services/properties/deletePropertyByID.js";
import createProperty from "../services/properties/createProperty.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    } = req.body;

    const missingFields = [];

    if (!hostId) {
      missingFields.push("hostId");
    }
    if (!title) {
      missingFields.push("title");
    }
    if (!description) {
      missingFields.push("description");
    }
    if (!location) {
      missingFields.push("location");
    }
    if (!pricePerNight) {
      missingFields.push("pricePerNight");
    }
    if (!bedroomCount) {
      missingFields.push("bedroomCount");
    }
    if (!bathRoomCount) {
      missingFields.push("bathRoomCount");
    }
    if (!maxGuestCount) {
      missingFields.push("maxGuestCount");
    }
    if (!rating) {
      missingFields.push("rating");
    }

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `missing fields ${missingFields}` });
    }

    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;
    const properties = await getProperties(location, pricePerNight);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyByID(id);

    if (!property) {
      return res
        .status(404)
        .json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyByID(id);

    if (!property) {
      return res
        .status(404)
        .json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    } = req.body;
    const property = await updatePropertyByID(
      id,
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    );

    if (!property) {
      return res
        .status(404)
        .json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

export default router;
