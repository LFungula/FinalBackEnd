import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities";
import getAmenityByID from "../services/amenities/getAmenityByID";
import patchAmenityByID from "../services/amenities/patchAmenityByID";
import deleteAmenityByID from "../services/amenities/deleteAmenityByID";
import createAmeniy from "../services/amenities/createAmenity";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newAmenity = await createAmeniy(name);
  res.status(201).json(newAmenity);
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  const amenities = await getAmenities(name);
  res.status(200).json(amenities);
});

router.get("/:id", async (req, res) => {
  const id = req.params;
  const amenity = await getAmenityByID(id);
  res.status(200).json(amenity);
});

router.delete("/:id", async (req, res) => {
  const id = req.params;
  const amenity = await deleteAmenityByID(id);
  res.status(200).json(amenity);
});

router.patch("/:id", async (req, res) => {
  const id = req.params;
  const amenity = await patchAmenityByID(id);
  res.status(200).json(amenity);
});
