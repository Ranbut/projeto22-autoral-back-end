import { ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}

export function duplicatedUsernameError(): ApplicationError {
  return {
    name: 'DuplicatedUsernameError',
    message: 'The given username is already being used',
  };
}
