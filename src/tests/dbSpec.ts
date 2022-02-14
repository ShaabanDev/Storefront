import { ProductModel, Product } from '../models/productModel';

const model = new ProductModel();

describe('database test', () => {
  describe('product methods testing', () => {
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
  });
});
