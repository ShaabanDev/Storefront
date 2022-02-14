import pool from '../database';

export type Order = {
  id: number;
  userId: number;
  orderstatus?: string;
};

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export class OrderModel {
  async create(userId: number): Promise<Order> {
    const conn = await pool.connect();
    const orderStatus = 'active';

    try {
      let sql = 'SELECT * FROM orders WHERE userId=$1 AND orderStatus=$2';
      let result = await conn.query(sql, [userId, orderStatus]);

      if (result.rows.length === 0) {
        sql = 'INSERT INTO orders (userId) VALUES ($1) RETURNING *';
        result = await conn.query(sql, [userId]);

        conn.release();
        return result.rows[0];
      } else {
        throw new Error('Failed to add new order');
      }
    } catch (err) {
      conn.release();
      throw err;
    }
  }

  async show(orderId: number): Promise<Order> {
    const conn = await pool.connect();

    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      conn.release();
      throw err;
    }
  }

  async index(): Promise<Order[]> {
    const conn = await pool.connect();

    try {
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      conn.release();
      console.log('Getting All Orders Failed', err);
      throw err;
    }
  }

  async update(orderId: number, orderStatus: string): Promise<Order> {
    const conn = await pool.connect();

    try {
      const sql = 'UPDATE orders SET orderStatus=$1 WHERE id=$2 RETURNING *';
      const result = await conn.query(sql, [orderStatus, orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      conn.release();
      console.log('Order Updating Failed', err);
      throw err;
    }
  }

  async addProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<OrderProduct> {
    const conn = await pool.connect();

    try {
      let sql = 'SELECT * FROM orders WHERE id=$1';
      let result = await conn.query(sql, [orderId]);
      if (result.rows.length && result.rows[0].orderstatus === 'active') {
        sql =
          'INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *';
        result = await conn.query(sql, [orderId, productId, quantity]);
        conn.release();
        return result.rows[0];
      } else {
        throw new Error('Can not find the order');
      }
    } catch (err) {
      conn.release();

      console.log('Adding Product Failed', err);

      throw err;
    }
  }
}
