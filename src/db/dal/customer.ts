import Customer from '../models/customer'

export const create = async (payload: Customer): Promise<any> => {
    try {
        const customerDb = await Customer.create(payload)
        if (customerDb == null) {
            return null
        }
        return customerDb.dataValues

    } catch (error: any) {
        console.error('Error on save customer:', error.message);
        throw new Error('Error on save customer');   
    }
}

export const getById = async (id: string): Promise<any> => {
    try {
        const customerDb = await Customer.findByPk(id);
        if (customerDb == null) {
            return null
        }
        return customerDb.dataValues
    } catch (error: any) {
        console.error('Error find customer:', error.message);
        throw new Error('Error find customer:');  
    }
}