import { protect } from '../middlewares/auth';
import express, { Request, Response } from 'express';
import { Product, ProductModel } from '../models/productModel';

const productModel = new ProductModel();

const indexProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

const showProduct = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);
  try {
    const product = await productModel.show(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  const newProduct: Product = { ...req.body };
  try {
    const product = await productModel.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const productHandlers = (app: express.Application): void => {
  app.post('/api/products/create', protect, createProduct);
  app.get('/api/products/index', indexProducts);
  app.get('/api/products/:id', showProduct);
};
