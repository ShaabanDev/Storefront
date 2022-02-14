import pool from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserModel {
  async create(newUser: User): Promise<User> {
    newUser.password = await bcrypt.hash(
      newUser.password,
      parseInt(process.env.HASH_ROUND as string)
    );
    const conn = await pool.connect();
    try {
      const sql =
        'INSERT INTO users (id, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        newUser.id,
        newUser.firstName,
        newUser.lastName,
        newUser.password,
      ]);
      const createdUser = result.rows[0];
      conn.release();

      return createdUser;
    } catch (err) {
      conn.release();
      console.log('Inserting Failed', err);
      throw err;
    }
  }
}
