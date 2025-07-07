import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const updateHostByID = async (
  id,
  { username, password, name, email, phoneNumber, profilePicture, aboutMe }
) => {
  const host = await prisma.host.findUnique({ where: { id } });

  if (!host) {
    console.warn(`Host with ID ${id} not found.`);
    return null;
  }

  const updatedHost = await prisma.host.update({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });

  return updatedHost;
};

export default updateHostByID;
