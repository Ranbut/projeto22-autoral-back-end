import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError, duplicatedUsernameError } from './errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ username, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  await validateUniqueUsernameOrFail(username);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    username,
    email,
    password: hashedPassword,
    avatar: 'https://cdn-icons-png.flaticon.com/512/634/634012.png'
  });
}

export async function updateAvatar(userId: number, avatar: string) {
  await userRepository.updateAvatar(userId, avatar);
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function validateUniqueUsernameOrFail(username: string) {
  const userWithSameUsername = await userRepository.findByUsername(username);
  if (userWithSameUsername) {
    throw duplicatedUsernameError();
  }
}

export type CreateUserParams = Pick<User, 'username' | 'email' | 'password'>;

const userService = {
  createUser,
  updateAvatar,
};

export * from './errors';
export default userService;
