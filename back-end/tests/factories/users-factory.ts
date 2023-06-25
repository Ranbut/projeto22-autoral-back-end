import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      username: params.username || faker.name.firstName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      avatar: faker.image.imageUrl()
    },
  });
}

export function mockUser() {
  return {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword',
    avatar: 'defaultImage',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}