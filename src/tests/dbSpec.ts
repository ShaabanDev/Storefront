import { Order, OrderModel } from '../models/orderModel';
import { ProductModel, Product } from '../models/productModel';
import { User, UserModel } from '../models/userModel';

describe('database test', () => {
  describe('product model methods testing', () => {
    const model = new ProductModel();

    const newProduct: Product = {
      id: 1,
      name: 'p1',
      price: 5431.0,
    };

    it('creating new product', async () => {
      const createdProduct = await model.create(newProduct);
      expect(createdProduct.id).toBeDefined();
      expect(createdProduct.name).toEqual(newProduct.name);
    });

    it('reading all products', async () => {
      const allProducts = await model.index();
      expect(allProducts.length).toBeGreaterThanOrEqual(1);
    });

    it('get one product by its id', async () => {
      const product = await model.show(newProduct.id as number);
      expect(product.id).toBeDefined();
      expect(product.id).toEqual(newProduct.id);
    });
  });

  describe('user model methods testing', () => {
    const model = new UserModel();

    const newUser: User = {
      id: 1,
      firstname: 'mohamed',
      lastname: 'shaban',
      password: '123456',
    };

    it('creating new user', async () => {
      const UserWithToken = await model.create(newUser);
      expect(UserWithToken.user.id).toBeDefined();
      expect(UserWithToken.token).toBeDefined();
      expect(UserWithToken.user.firstname).toEqual(newUser.firstname);
    });

    it('getting user by its id', async () => {
      const user = await model.show(newUser.id as number);
      expect(user.id).toBeDefined();
      expect(user.firstname).toEqual(newUser.firstname);
    });
  });

  describe('user model methods testing', () => {
    const model = new OrderModel();

    const newOrder: Order = {
      id: 1,
      userId: 1,
    };

    it('creating new order', async () => {
      const createdOrder = await model.create(1);
      expect(newOrder.id).toEqual(createdOrder.id);
    });

    it('getting order by its id', async () => {
      const createdOrder = await model.show(1);
      expect(newOrder.id).toEqual(createdOrder.id);
    });
  });
});
