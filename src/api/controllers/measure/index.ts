import { Request, Response } from 'express';
import Validate from '../../../db/models/validate';
import * as serviceMeasure from '../../services/measure'
import measureSchema from '../../validations/validateMeasure';
import validateBase64 from '../../helper/validateBase64';
import compareDates from '../../helper/compareDates';
import Measure from '../../../db/models/measure';

export const validateData = async (req: Request): Promise<Validate> => {
  // valida dados 
  const { error } = measureSchema.validate(req.body, { abortEarly: false })

  if (error) {
    // Se houver erros, retorna uma resposta com status 400 e os detalhes dos erros  
    return new Validate({
      message: 'Erro de validação',
      details: error.details.map((err: any) => err.message),
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

export const validateDataConfirm = async (input: any): Promise<Validate> => {
  // Verifica se 'measure_uuid' é uma string
  if (typeof input.measure_uuid !== 'string') {
    return new Validate({
      message: 'Erro de validação',
      details: ['measure_uuid: precisa ser uma string.'],
      error: true
    })
  }

  // Verifica se 'confirmed_value' é um número inteiro
  if (typeof input.confirmed_value !== 'number' || !Number.isInteger(input.confirmed_value)) {
    return new Validate({
      message: 'Erro de validação',
      details: ['confirmed_value: precisa ser um inteiro.'],
      error: true
    })
  }

  // Validação bem-sucedida
  return new Validate({
    message: 'Ok',
    details: ['Ok'],
    error: false
  })
}

export const validateParams = async (payload: any): Promise<Validate> => {
  // Verifica se 'measure_uuid' é uma string
  if (payload.type == 'WATER' || payload.type == 'GAS') {
    return new Validate({
      message: 'Ok',
      details: ['Ok'],
      error: false
    })
  }

  // Validação bem-sucedida
  return new Validate({
    message: 'Tipo de medição não permitida',
    details: ['INVALID_TYPE'],
    error: true
  })
}

export const checkReading = async (payload: any): Promise<boolean> => {
  // verifica a medição do mes 
  // busca as medições pelo cliente id 
  const measures = await serviceMeasure.checkReading(payload.customer_code);

  if (measures.length > 0) {
    // valida as datas
    const result = measures.filter((item: Measure) =>
      compareDates(item.measure_datetime.toString(), payload.measure_datetime) && item.measure_type == payload.measure_type
    )

    if (result.length > 0) {
      return true;
    }

    return false;
  }

  return false
}

export const checkMeasureExist = async (payload: any): Promise<Measure | null> => {
  //verifica se a medição existe
  return await serviceMeasure.findMeasureById(payload.measure_uuid);
}

export const consultGemini = async (imageBase64: any): Promise<number> => {
  let matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  let type = matches[1]
  let imgData = matches[2]

  // to do -> faz upload
  // const img = await serviceMeasure.uploadImage(imgData, type)

  // Implementar a lógica para consultar o Gemini aqui
  const retorno = await serviceMeasure.sendImageToGemini(imgData, type)
  // Retorna uma medida simulada por enquanto

  let value = retorno.match(/\d+/)

  if (value) {
    let measuredValue = parseInt(value[0])

    return measuredValue
  }
  else {
    return 0
  }
}

export const save = async (data: any, value: any): Promise<any> => {

  const measure = {
    measure_datetime: data.measure_datetime,
    customer_id: data.customer_code,
    measure_type: data.measure_type,
    measure_value: value,
    has_confirmed: false,
  }

  // envia ao servico para salvar
  const retorno = await serviceMeasure.save(measure)
  return retorno;
}

export const updateValue = async (payload: Measure, confirmed_value: number): Promise<any> => {
  // envia ao valor para atualizar 
  return await serviceMeasure.update(payload, confirmed_value)
}

export const findMeasuresByClient = async (customer_code: string): Promise<any> => {
  // busca as medições pelo cliente id 
  return await serviceMeasure.checkReading(customer_code);
}

export const findMeasuresByClientAndByType = async (payload: any): Promise<any> => {
  // busca as medições pelo cliente id e tipo
  return await serviceMeasure.checkReadingByType(payload);
}