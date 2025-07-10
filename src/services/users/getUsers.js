import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getUsers = async (username, email) => {
  const user = await prisma.user.findMany({
    where: {
      username,
      email,
    },
  });

  if (!user) {
    console.warn(`User not found.`);
    return null;
  }

  if (user.length === 0) {
    console.warn(`User not found.`);
    return null;
  }

  return user;
};

export default getUsers;
