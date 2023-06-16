import { Bookmark, Character, History, Spell } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type BookmarkType = Omit<Bookmark, 'id'| 'userId' | 'createdAt' | 'updatedAt'>;

export type CreateCharacterParams = Omit<Character, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateBookmarkParams = Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateSpellParams = Omit<Spell, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateHistoryParams = Omit<History, 'id' | 'createdAt' | 'updatedAt'>;
