import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Bem vindo a api_shopper: http://localhost:${port}/api/v1` })
})

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}
catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}