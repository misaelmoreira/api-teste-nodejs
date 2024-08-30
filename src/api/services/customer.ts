import * as customerDal from '../../db/dal/customer'

export const save = async (customer: any): Promise<any> => {
    try {
        const customerDb = await customerDal.create(customer)
        if (customerDb == null) {
            return null
        }
        return customerDb.dataValues
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}

export const findCustomerById = async (id: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        const customerDb = await customerDal.getById(id)
        if (customerDb == null) {
            return null
        }
        return customerDb.dataValues
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}

