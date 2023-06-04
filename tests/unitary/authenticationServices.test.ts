import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticationService, { SignInParams, SignInResult } from '@/services/authentication-service/index';
import userRepository from '@/repositories/user-repository/index';
import sessionRepository from '@/repositories/session-repository/index';
import { mockUser } from '../factories';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('@/repositories/user-repository');
jest.mock('@/repositories/session-repository');

describe('Authentication Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const createdMockUser = mockUser();
    const params: SignInParams = {
      email: 'test@example.com',
      password: 'password',
    };

    test('should sign in successfully and return user data and token', async () => {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(createdMockUser);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        jest.spyOn(sessionRepository, 'create').mockResolvedValue(undefined);
  
        const expected: SignInResult = {
          user: { id: createdMockUser.id, email: createdMockUser.email },
          token: 'token',
        };
  
        const result = await authenticationService.signIn(params);
        expect(result.user).toEqual(expect.objectContaining(expected.user));
        expect(result.token).toEqual(expected.token);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(params.email, expect.objectContaining({ id: true, email: true, password: true }));
        expect(bcrypt.compare).toHaveBeenCalledWith(params.password, createdMockUser.password);
        expect(jwt.sign).toHaveBeenCalledWith({ userId: createdMockUser.id }, process.env.JWT_SECRET);
        expect(sessionRepository.create).toHaveBeenCalledWith({ token: 'token', userId: createdMockUser.id });
      });
  
    test('should throw invalid credentials error if user does not exist', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(undefined);

      await expect(authenticationService.signIn(params)).rejects.toMatchObject({
        name: 'InvalidCredentialsError',
        message: 'email or password are incorrect',
      });
    });


    test('should throw invalid credentials error if password is incorrect', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(createdMockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(authenticationService.signIn(params)).rejects.toMatchObject({
        name: 'InvalidCredentialsError',
        message: 'email or password are incorrect',
      });
    });
  });
});
