import { PrismaClient } from "@prisma/client";

const getHostByID = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({ where: { id } });

  return host;
};

export default getHostByID;
