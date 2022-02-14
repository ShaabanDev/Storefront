import pool from '../database';

export type Order = {
  id: number;
  userId: number;
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
      console.log('Getting Order Failed', err);
      throw err;
    }
  }
}
