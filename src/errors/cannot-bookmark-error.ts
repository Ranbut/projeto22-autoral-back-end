import { ApplicationError } from '@/protocols';

export function cannotBookmarkError(): ApplicationError {
  return {
    name: 'CannotBookmarkError',
    message: 'User already bookmarked this index!',
  };
}
