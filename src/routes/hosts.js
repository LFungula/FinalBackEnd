import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostByID from "../services/hosts/getHostByID.js";
import updateHostByID from "../services/hosts/updateHostByID.js";
import deleteHostByID from "../services/hosts/deleteHostByID.js";
import createHost from "../services/hosts/createHost.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostByID(id);

    if (!host) {
      return res.status(404).json({ message: `Host with id ${id} not found` });
    }
    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await deleteHostByID(id);

    if (!host) {
      return res.status(404).json({ message: `Host with id ${id} not found` });
    }
    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await updateHostByID(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (!host) {
      return res.status(404).json({ message: `Host with id ${id} not found` });
    }
    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

export default router;
