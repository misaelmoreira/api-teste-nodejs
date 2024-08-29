import Measure, { MeasureInput } from '../models/measure'

export const getAll = async (): Promise<Measure[]> => {
    return await Measure.findAll()
}

export const getAllByIdCustomer = async (id: string): Promise<Measure[]> => {
    try {
        return await Measure.findAll({
            where: {
                customer_id: id
            }
        })
    } catch (error) {
        console.error('Error fetching measures:', error.message);
        throw new Error('Error fetching measures:');
    }
}

export const create = async (payload: Measure): Promise<any> => {
    try {
        const measure = await Measure.create(payload)
        return measure.dataValues
    } catch (error) {
        console.error('Error on save measures:', error.message);
        throw new Error('Error on save measures');   
    }
}