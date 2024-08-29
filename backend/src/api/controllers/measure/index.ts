import { Request, Response } from 'express';
import Validate from '../../../db/models/validate';
import * as serviceMeasure from '../../services/measure'
import measureSchema from '../../validations/validateMeasure';
import validateBase64 from '../../helper/validateBase64';

export const validateData = async (req: Request): Promise<Validate> => {
  // valida dados 
  const { error } = measureSchema.validate(req.body, { abortEarly: false })

  if (error) {
    // Se houver erros, retorna uma resposta com status 400 e os detalhes dos erros  
    return new Validate({      
      message: 'Erro de validação',
      details: error.details.map(err => err.message),
      error: true    
    })
  }

  // Validar o tipo de dados dos parâmetros enviados (inclusive o base64)
  if (validateBase64(req.body.image)) {    
    return new Validate({
      message: 'Erro na imagem',
      details: ['Erro na imagem'],
      error: true
    })
  }
    
  return new Validate({
    message: 'Sucesso',
    details: [''],
    error: false
  })
}

export const checkReading = async (measure_datetime: any): Promise<boolean> => {
    //verifica a medição do mes 
    const result: any = await serviceMeasure.checkReading(measure_datetime);
    if (result.length > 0) {
      return false
    }
    return true
}

export const consultGemini = async (imageBase64: any): Promise<number> => {
  let matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  let type = matches[1]
  let imgData  = matches[2]


  // Implementar a lógica para consultar o Gemini aqui
  const retorno =  await serviceMeasure.sendImageToGemini(imgData, type)
  // Retorna uma medida simulada por enquanto

  return retorno; // Valor simulado, substituir pela lógica real
}