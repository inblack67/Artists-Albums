import { PrismaClient } from '@prisma/client';

export const getMyPrismaClient = () => {
  const prisma = new PrismaClient({
    log: ['error', 'info', 'query', 'warn'],
  });
  return prisma;
};
