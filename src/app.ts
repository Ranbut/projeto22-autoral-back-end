import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';
<<<<<<< Updated upstream
import { usersRouter, authenticationRouter, charactersRouter, bookmarksRouter } from '@/routers';
=======
import { usersRouter, authenticationRouter, charactersRouter, bookmarksRouter, historyRouter, spellsRouter } from '@/routers';
>>>>>>> Stashed changes
import { handleApplicationErrors } from './middlewares';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req: Request, res: Response) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/char', charactersRouter)
  .use('/spells', spellsRouter)
  .use('/bookmarks', bookmarksRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
