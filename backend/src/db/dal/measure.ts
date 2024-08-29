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
        console.error('Error fetching measures:', error);
        throw new Error('Could not fetch measures.');
    }
}

export const create = async (payload: Measure): Promise<any> => {
    const measure = await Measure.create(payload)
    return measure.dataValues
}