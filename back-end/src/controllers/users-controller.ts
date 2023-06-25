import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function usersPost(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;

  try {
    const user = await userService.createUser({ username , email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAvatar(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { avatar } = req.body;

  try {
    await userService.updateAvatar(userId, avatar);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

