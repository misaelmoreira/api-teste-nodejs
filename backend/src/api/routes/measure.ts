import { Router, Request, Response } from 'express';
import * as measureController from '../controllers/measure'
import Validate from '../../db/models/validate';

const measureRouter = Router();

measureRouter.post('/', async (req: Request, res: Response) => {

    //Validar o tipo de dados dos parâmetros enviados (inclusive o base64) 
    const data: Validate = await measureController.validateData(req)
    if (data.error) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: data.details })
    }

    //Verificar se já existe uma leitura no mês naquele tipo de leitura. 

    //Integrar com uma API de LLM para extrair o valor da imagem
}
)

export default measureRouter;