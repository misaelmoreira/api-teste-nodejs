import { Router, Request, Response } from 'express';
import * as measureController from '../controllers/measure'
import Validate from '../../db/models/validate'

const measureRouter = Router();

measureRouter.post('/upload', async (req: Request, res: Response) => {

    //Validar o tipo de dados dos parâmetros enviados (inclusive o base64) 
    const data: Validate = await measureController.validateData(req)
    if (data.error) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: data.details })
    }

    //Verificar se já existe uma leitura no mês naquele tipo de leitura. 
    const result = await measureController.checkReading(req.body)
    if (result) {
        return res.status(409).json({ error_code: "DOUBLE_REPORT", error_description: 'Leitura do mês já realizada' })
    }

    //Integrar com uma API de LLM para extrair o valor da imagem
    const value = await measureController.consultGemini(req.body.image) 
    if (value == 0) {    
        return res.status(409).json({ error_code: "DOUBLE_REPORT", error_description: 'Leitura do mês já realizada' })
    }

    // salvar a medição
    let measure = await measureController.save(req.body, 22) 
    if (measure.erro) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: measure.message })
    }

    // Operação realizada com sucesso devolver os parametros
    return res.status(200).send({
        image_url: measure.image_url,
        measure_value: measure.measure_value,
        measure_uuid: measure.measure_uuid  
    })
}
)

export default measureRouter;