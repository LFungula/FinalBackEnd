import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyByID from "../services/properties/getPropertyByID.js";
import updatePropertyByID from "../services/properties/updatePropertyByID.js";
import deletePropertyByID from "../services/properties/deletePropertyByID.js";
import createProperty from "../services/properties/createProperty.js";
//import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
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
    const { location, pricePerNight } = req.body;
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
      res.status(404).json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyByID(id);

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
    const property = await updatePropertyByID(id, {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    });

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

export default router;
