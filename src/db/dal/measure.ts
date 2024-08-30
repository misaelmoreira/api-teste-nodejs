import Measure from '../models/measure'

export const getAll = async (): Promise<Measure[]> => {
    try {
        return await Measure.findAll()
    } catch (error: any) {
        console.error('Error on find all measures:', error.message); 
        throw new Error('Error on find all measures.');       
    }
}

export const getAllMeasuresByIdCustomer = async (id: string): Promise<Measure[]> => {
    try {
        return await Measure.findAll({
            where: {
                customer_id: id
            },
            attributes: ['measure_uuid', 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url'] 
        })
    } catch (error: any) {
        console.error('Error find measures:', error.message);
        throw new Error('Error find measures:');
    }
}

export const getAllMeasuresByIdCustomerByType = async (payload: any): Promise<Measure[]> => {
    try {
        return await Measure.findAll({
            where: {
                customer_id: payload.id,
                measure_type: payload.type
            },
            attributes: ['measure_uuid', 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url'] 
        })
    } catch (error: any) {
        console.error('Error find measures:', error.message);
        throw new Error('Error find measures:');
    }
}

export const getById = async (id: string): Promise<Measure | null> => {
    try {
        return await Measure.findByPk(id);
    } catch (error: any) {
        console.error('Error find measure:', error.message);
        throw new Error('Error find measure'); 
    }
}

export const create = async (payload: Measure): Promise<any> => {
    try {
        const measureDb = await Measure.create(payload)
        return measureDb.dataValues
    } catch (error: any) {
        console.error('Error on save measure:', error.message);
        throw new Error('Error on save measure');   
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
        console.error('Error on update measure:', error.message);
        throw new Error('Error on update measure'); ;   
    }
}