import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
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

async function updateAvatar(id: number, avatar: string) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      avatar
    },
  });
}

const userRepository = {
  findByEmail,
  findByUsername,
  create,
  updateAvatar
};

export default userRepository;
