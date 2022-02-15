import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { userHandlers } from './handlers/userHandler';
dotenv.config();
const app: express.Application = express();
const address: string = `0.0.0.0:${process.env.PORT}`;
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
userHandlers(app);

app.listen(process.env.PORT, function () {
  console.log(`starting app on: ${address}`);
});
