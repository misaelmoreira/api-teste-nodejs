import Measure from '../models/measure'

export const getAll = async (): Promise<Measure[]> => {
    try {
        return await Measure.findAll()
    } catch (error: any) {
        console.error('Error on find all measures:', error.message); 
        throw new Error('Error on find all measures.');       
    }
}

export const getAllByIdCustomer = async (id: string): Promise<Measure[]> => {
    try {
        return await Measure.findAll({
            where: {
                customer_id: id
            }
        })
    } catch (error: any) {
        console.error('Error fetching measures:', error.message);
        throw new Error('Error fetching measures:');
    }
}

export const getAllByIdCustomerByType = async (payload: any): Promise<Measure[] | null> => {
    try {
        return await Measure.findAll({
            where: {
                customer_id: payload.id,
                measure_type: payload.type
            }
        })
    } catch (error: any) {
        console.error('Error fetching measures:', error.message);
        return null;
    }
}

export const getById = async (id: string): Promise<Measure | null> => {
    try {
        return await Measure.findByPk(id);
    } catch (error: any) {
        console.error('Error fetching measures:', error.message);
        return null;
    }
}

export const create = async (payload: Measure): Promise<any> => {
    try {
        const measure = await Measure.create(payload)
        return measure.dataValues
    } catch (error: any) {
        console.error('Error on save measures:', error.message);
        throw new Error('Error on save measures');   
    }
}

export const update = async (payload: Measure, value: number): Promise<any> => {
    try {
        return await Measure.update(
            { measure_value: value,
              has_confirmed: true
             },  
            { where: { measure_uuid: payload.measure_uuid } }         
        )
    } catch (error: any) {
        console.error('Error on save measures:', error.message);
        return null;   
    }
}