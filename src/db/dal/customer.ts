import Customer from '../models/customer'

export const create = async (payload: Customer): Promise<any> => {
    try {
        const customer = await Customer.create(payload)
        return customer.dataValues
    } catch (error: any) {
        console.error('Error on save customers:', error.message);
        throw new Error('Error on save customers');   
    }
}

export const getById = async (id: string): Promise<Customer | null> => {
    try {
        return await Customer.findByPk(id);
    } catch (error: any) {
        console.error('Error fetching measures:', error.message);
        return null;
    }
}