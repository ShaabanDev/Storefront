import pool from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export type UserWithToken = {
  user: User;
  token: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    const conn = await pool.connect();

    try {
      const sql = 'SELECT id, firstname, lastname FROM users';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      conn.release();
      throw err;
    }
  }
  async create(newUser: User): Promise<UserWithToken> {
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
        newUser.firstname,
        newUser.lastname,
        newUser.password,
      ]);
      const createdUser = result.rows[0];
      const token = jwt.sign(
        { id: createdUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      );

      const authUser: UserWithToken = { user: createdUser, token };
      conn.release();

      return authUser;
    } catch (err) {
      conn.release();
      console.log(err);
      throw err;
    }
  }

  async show(userId: number): Promise<User> {
    const conn = await pool.connect();
    try {
      const sql = 'SELECT id, firstname, lastname FROM users WHERE id=$1';
      const result = await conn.query(sql, [userId]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      conn.release();
      throw err;
    }
  }
}
