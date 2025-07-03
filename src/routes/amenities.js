import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityByID from "../services/amenities/getAmenityByID.js";
import patchAmenityByID from "../services/amenities/patchAmenityByID.js";
import deleteAmenityByID from "../services/amenities/deleteAmenityByID.js";
import createAmenity from "../services/amenities/createAmenity.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  res.status(201).json(newAmenity);
});

router.get("/", async (req, res) => {
  const amenities = await getAmenities();
  res.status(200).json(amenities);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const amenity = await getAmenityByID(id);
  res.status(200).json(amenity);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const amenity = await deleteAmenityByID(id);
  res.status(200).json(amenity);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const amenity = await patchAmenityByID(id, updatedData);
  res.status(200).json(amenity);
});

export default router;
