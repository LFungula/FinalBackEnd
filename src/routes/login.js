import { Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();
const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey);

    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});

export default router;
