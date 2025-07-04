import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import getUserByID from "../services/users/getUserByID.js";
import updateUserByID from "../services/users/updateUserByID.js";
import deleteUserByID from "../services/users/deleteUserByID.js";
import createUser from "../services/users/createUser.js";
//import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.body;
    const users = await getUsers(location, pricePerNight);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByID(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserByID(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUserByID(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
