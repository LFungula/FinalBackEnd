import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const newHost = await prisma.host.create({
    data: {
      id: uuidv4(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });

  return newHost;
};

export default createHost;
