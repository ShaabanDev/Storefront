import supertest from 'supertest';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';

import app from '../server';
const request = supertest(app);
describe('all routes testing', () => {
  let token: string;

  describe('user routes test', () => {
    const newUser: User = {
      id: 11,
      firstname: 'ahmed',
      lastname: 'yasser',
      password: '123456',
    };

    it('create new user route response to be 201 ', async () => {
      const response = await request.post('/api/users/create').send(newUser);
      expect(response.status).toBe(201);
      token = response.body.token;
    });

    it('index route response to be 200', async () => {
      const response = await request
        .get('/api/users/index')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('index route response to be 200', async () => {
      const response = await request
        .get('/api/users/11')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('product routes test', () => {
    const newProduct: Product = {
      id: 12,
      name: 'product3',
      price: 123.0,
    };

    it('create new product route response to be 201 ', async () => {
      const response = await request
        .post('/api/products/create')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(201);
    });

    it('index route response to be 200', async () => {
      const response = await request.get('/api/products/index');
      expect(response.status).toBe(200);
    });

    it('show route response to be 200', async () => {
      const response = await request.get('/api/products/12');
      expect(response.status).toBe(200);
    });
  });

  describe('order routes test', () => {
    it('show route response to be 200', async () => {
      const response = await request
        .get('/api/orders/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
