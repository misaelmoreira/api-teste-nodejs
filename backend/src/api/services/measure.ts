import * as measureDal from '../../db/dal/measure'
import compareDates from '../helper/compareDates';

export const checkReading = async (measure_datetime: string): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    const measures = await measureDal.getAll()

    const result = measures.filter(item =>
        compareDates(item.measure_datetime, measure_datetime)
    )

    return result;
}