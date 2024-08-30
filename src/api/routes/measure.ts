import { Router, Request, Response } from 'express';
import * as measureController from '../controllers/measure'
import Validate from '../../db/models/validate'
import Measure from '../../db/models/measure';

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

measureRouter.patch('/confirm', async (req: Request, res: Response) => {
    //Validar o tipo de dados dos parâmetros enviados 
    const data: Validate = await measureController.validateDataConfirm(req.body)
    if (data.error) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: data.details })
    }

    //Verificar se o código de leitura informado existe
    const measureDb = await measureController.checkMeasureExist(req.body)
    if (measureDb == null) {
        return res.status(404).json({ error_code: "MEASURE_NOT_FOUND", error_description: 'Leitura do mês não encontrada' })
    }

    // Verificar se o código de leitura já foi confirmado
    if (measureDb.has_confirmed) {
        return res.status(409).json({ error_code: "DOUBLE_REPORT", error_description: 'Leitura do mês já realizada' })
    }

    // Salvar no banco de dados o novo valor informado
    let result = await measureController.updateValue(measureDb, req.body.confirmed_value)
    if (result == null) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: 'erro ao atualizar' })
    }

    // Operação realizada com sucesso devolver os parametros
    return res.status(200).send({
        success: true,
    })
}
)

measureRouter.get('/:id/list', async (req: Request, res: Response) => {
    let result: Measure[]
    const payload = {
        id: req.params.id,
        type: req.query.measure_type
    }

    // Ele opcionalmente pode receber um query parameter measure_type, que deve ser “WATER” ou “GAS”
    if (payload.type !== undefined) {
        //Validar o tipo de dados dos parâmetros enviados 
        const data: Validate = await measureController.validateParams(payload)
        if (data.error) {
            return res.status(400).json({ error_code: "INVALID_TYPE", error_description: data.message })
        }

        //Receber o código do cliente e filtrar as medidas realizadas por ele
        result = await measureController.findMeasuresByClientAndByType(payload)
        if (result == null || result.length == 0) {
            return res.status(404).json({ error_code: "MEASURE_NOT_FOUND", error_description: 'Nenhuma leitura encontrada' })
        }
    }
    else {
        //Receber o código do cliente e filtrar as medidas realizadas por ele 
        result = await measureController.findMeasuresByClient(payload.id)
        if (result == null || result.length == 0) {
            return res.status(404).json({ error_code: "MEASURE_NOT_FOUND", error_description: 'Nenhuma leitura encontrada' })
        }
    }

    // To do arrumar o formato de saida
    // Operação realizada com sucesso devolver os parametros
    return res.status(200).send({
        customer_code: payload.id,
        measures: result
    })
}
)

export default measureRouter;