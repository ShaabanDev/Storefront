import { protect } from '../middlewares/auth';
import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/orderModel';
const orderModel = new OrderModel();
const showOrder = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  try {
    const order = await orderModel.show(userId);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const orderHandlers = (app: express.Application): void => {
  app.get('/api/orders/:id', protect, showOrder);
};
