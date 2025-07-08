import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const newUser = await prisma.user.create({
    data: {
      id: uuidv4(),
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
