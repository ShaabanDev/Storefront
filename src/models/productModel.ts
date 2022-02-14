import pool from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  async create(newProduct: Product): Promise<Product> {
    const conn = await pool.connect();
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [newProduct.name, newProduct.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      conn.release();
      console.log('Inserting Failed', err);
      throw err;
    }
  }

  async index(): Promise<Product[]> {
    const conn = await pool.connect();

    try {
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      conn.release();
      console.log('Indexing Failed', err);
      throw err;
    }
  }

  async show(productId: number): Promise<Product> {
    const conn = await pool.connect();

    try {
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await conn.query(sql, [productId]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      conn.release();
      console.log('Getting Product Failed', err);
      throw err;
    }
  }
}
