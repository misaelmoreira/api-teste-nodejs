import express, { Request, Response, Application } from 'express';
import dotenv from "dotenv"
import sequelize from './db/config';

dotenv.config()

import routes from './api/routes';

const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Bem vindo a api_shopper: http://localhost:${port}/api/v1` })
})

app.use('/api/v1', routes)

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}
catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}