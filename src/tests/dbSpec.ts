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
      firstName: 'mohamed',
      lastName: 'shaban',
      password: '123456',
    };

    it('creating new user', async () => {
      const createdUser = await model.create(newUser);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.firstName).toEqual(createdUser.firstName);
    });
  });
});
