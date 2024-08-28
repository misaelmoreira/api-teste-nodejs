import Joi from 'joi';

// Define o esquema de validação
const measureSchema = Joi.object({
  image: Joi.string().required().messages({
    'string.base': 'O campo "image" deve ser uma string.',
    'any.required': 'O campo "image" é obrigatório.'
  }),
  customer_code: Joi.string().required().messages({
    'string.base': 'O campo "customer_code" deve ser uma string.',
    'any.required': 'O campo "customer_code" é obrigatório.'
  }),
  measure_datetime: Joi.date().iso().required().messages({
    'date.base': 'O campo "measure_datetime" deve ser uma data válida.',
    'date.iso': 'O campo "measure_datetime" deve estar no formato ISO.',
    'any.required': 'O campo "measure_datetime" é obrigatório.'
  }),
  measure_type: Joi.string().valid('WATER', 'GAS').required().messages({
    'string.base': 'O campo "measure_type" deve ser uma string.',
    'string.valid': 'O campo "measure_type" deve ser "WATER" ou "GAS".',
    'any.required': 'O campo "measure_type" é obrigatório.'
  })
});

export default measureSchema;
