import express, { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import { User, UserModel } from '../models/userModel';

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
    const newUser = await userModel.show(userId);
    res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
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
  app.get('/api/users/:id', protect, showUser);
  app.get('/api/users/index', protect, indexUsers);
};
// router.post('/users/create', createUser);
// export default router;
