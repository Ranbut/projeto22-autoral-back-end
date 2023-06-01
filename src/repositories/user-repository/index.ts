import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  findByUsername,
  create,
};

export default userRepository;
