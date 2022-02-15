import express, { Router, Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
const model = new UserModel();
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken: JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const userId = (await model.show(decodedToken.id as number)).id;
      if (userId) {
        return next();
      }
      res.status(404).json({
        message: 'Failed to authorize user, Token Failed',
      });
      throw new Error();
    } catch (error) {
      res.status(404).json({
        message: 'Failed to authorize user, Token Failed',
      });
    }
  } else {
    res.status(404).json({
      message: 'Failed to authorize user, Token Failed',
    });
  }
};
