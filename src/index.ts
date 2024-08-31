import express, { Request, Response, Application } from 'express';
import dotenv from "dotenv"
import "reflect-metadata";

dotenv.config()

import routes from './api/routes';
import dbInit from './db/init';

const app: Application = express();
const port = 5001;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `Bem vindo a api_shopper: http://localhost:${port}/` })
})

app.use('/', routes)

const start = async (): Promise<void> => {
  try {
    await dbInit();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  }
  catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
  }
}

void start();