import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getUsers = async (username, email) => {
  const user = await prisma.user.findMany({
    where: {
      username,
      email,
    },
  });

  return user;
};

export default getUsers;
