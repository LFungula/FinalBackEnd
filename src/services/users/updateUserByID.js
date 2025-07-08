import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserByID = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    console.warn(`User with ID ${id} not found.`);
    return null;
  }

  const updateUser = await prisma.user.updateMany({
    where: { id },
    data: {
      username: username,
      password: password,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      profilePicture: profilePicture,
    },
  });

  if (!updateUser || updateUser.count === 0) {
    throw new NotFoundError("user", id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserByID;
