import { PrismaClient } from "@prisma/client";

const getHost = async (name) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return host;
};

export default getHost;
