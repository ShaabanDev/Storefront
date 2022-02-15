import express, { Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import { UserModel } from '../models/userModel';

const userModel = new UserModel();
const createUser = async (req: Request, res: Response) => {
  const { id, firstname, lastname, password } = req.body;
  try {
    const newUser = await userModel.create({
      id,
      firstname,
      lastname,
      password,
    });
    res.status(201).send({
      firstname: newUser.user.firstname,
      token: newUser.token,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const showUser = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  try {
    const user = await userModel.show(userId);
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const userHandlers = (app: express.Application): void => {
  app.post('/api/users/create', createUser);
  app.get('/api/users/index', protect, indexUsers);
  app.get('/api/users/:id', protect, showUser);
};
