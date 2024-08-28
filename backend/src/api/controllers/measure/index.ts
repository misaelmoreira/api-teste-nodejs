import { Request, Response } from 'express';
import Validate from '../../../db/models/validate';
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