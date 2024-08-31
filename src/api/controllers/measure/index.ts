import { Request, Response } from 'express';
import Validate from '../../../db/models/validate';
import * as serviceMeasure from '../../services/measure'
import * as serviceCustomer from '../../services/customer'
import measureSchema from '../../validations/validateMeasure';
import compareDates from '../../helper/compareDates';
import isValidDateTime from '../../helper/validateDates';
import Measure from '../../../db/models/measure';
import isBase64 from '../../helper/isBase64';

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

  if(!isValidDateTime(req.body.measure_datetime))
  {
    return new Validate({
      message: 'Erro de validação',
      details: ['erro no formato de data'],
      error: true
    })
  }

  // Validar o tipo de dados dos parâmetros enviados (inclusive o base64)
  if (!isBase64(req.body.image)) {
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

export const consultGemini = async (imageBase64: any): Promise<any> => {
  let matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  let type = matches[1]
  let imgData = matches[2]

  // faz upload da imagem
  const img = await serviceMeasure.uploadImage(imgData, type)

  // Implementar a lógica para consultar o Gemini aqui
  const retorno = await serviceMeasure.sendImageToGemini(imgData, type)
  if(retorno.error == false){
    let value = retorno.match(/\d+/)

    if (value) {
      let measuredValue = parseInt(value[0])

      return { measure_value: measuredValue, image_url: img}
    }
  }

  return { error: retorno.error, message: retorno.message}  
}

export const save = async (data: any, obj: any): Promise<any> => { 
  // verifica se ja existe o customer
  const customerdb = await serviceCustomer.findCustomerById(data.customer_code)
  if(customerdb == null) {
    const customer = {
      id: data.customer_code
    }

    await serviceCustomer.save(customer)
  }

  const measure = {
    measure_datetime: data.measure_datetime,
    customer_id: data.customer_code,
    measure_type: data.measure_type,
    measure_value: obj.measure_value,
    has_confirmed: false,
    image_url: obj.image_url
  }

  // envia ao servico para salvar
  return await serviceMeasure.save(measure)
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