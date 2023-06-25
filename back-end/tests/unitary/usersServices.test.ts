import bcrypt from 'bcrypt';
import { mocked } from 'ts-jest/utils';
import { createUser, CreateUserParams } from '@/services/users-service/index';
import userRepository from '@/repositories/user-repository';
import { mockUser } from '../factories';

jest.mock('bcrypt');
const mockedBcrypt = mocked(bcrypt, true);

jest.mock('@/repositories/user-repository', () => {
  const mockFindByEmail = jest.fn();
  const mockFindByUsername = jest.fn();
  const mockCreate = jest.fn();

  return {
    __esModule: true,
    default: {
      findByEmail: mockFindByEmail,
      findByUsername: mockFindByUsername,
      create: mockCreate,
    },
    findByEmail: mockFindByEmail,
    findByUsername: mockFindByUsername,
    create: mockCreate,
  };
});

describe('createUser', () => {
  const createdMockUser = mockUser();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new user when provided with valid parameters', async () => {
    const createUserParams: CreateUserParams = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    mocked(userRepository.create).mockResolvedValue(createdMockUser);

    mockedBcrypt.hash.mockImplementation(() => Promise.resolve('hashedPassword'));

    const result = await createUser(createUserParams);

    expect(userRepository.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
      avatar: 'https://cdn-icons-png.flaticon.com/512/634/634012.png',
    });

    expect(result).toEqual(createdMockUser);
  });

  it('should throw an error when an email is already used', async () => {
    const createUserParams: CreateUserParams = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };
  
    mocked(userRepository.findByEmail).mockResolvedValue(createdMockUser);
  
    try {
      await createUser(createUserParams);
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toMatch(/There is already an user with given email/);
      expect(error.name).toBe('DuplicatedEmailError');
    }
  });  

  it('should throw an error when a username is already used', async () => {
    const createUserParams: CreateUserParams = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };
  
    mocked(userRepository.findByUsername).mockResolvedValue(createdMockUser);
  
    try {
      await createUser(createUserParams);
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toMatch(/The given username is already being used/);
      expect(error.name).toBe('DuplicatedUsernameError');
    }
  });  
});