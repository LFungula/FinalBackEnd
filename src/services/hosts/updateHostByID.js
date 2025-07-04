const updateHostByID = async (id, name) => {
  const prisma = new PrismaClient();

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
