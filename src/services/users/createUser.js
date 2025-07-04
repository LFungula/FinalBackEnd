import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const newUser = await prisma.user.create({
    data: {
      id: uuidv4(), // pass id inside the "data" object
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return newUser;
};

export default createUser;
