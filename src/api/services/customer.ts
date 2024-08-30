import * as customerDal from '../../db/dal/customer'

export const save = async (customer: any): Promise<any> => {
    try {
        return await customerDal.create(customer)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}

export const findCustomerById = async (id: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        return await customerDal.getById(id)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}

