import { Router, Request, Response } from 'express';

const measureRouter = Router();

measureRouter.post('/', async (req: Request, res: Response) => {

    //Validar o tipo de dados dos parâmetros enviados (inclusive o base64) 

    //Verificar se já existe uma leitura no mês naquele tipo de leitura. 

    // Integrar com uma API de LLM para extrair o valor da imagem
}
)

export default measureRouter;