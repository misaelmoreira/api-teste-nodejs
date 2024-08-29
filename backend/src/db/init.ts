import Customer from './models/customer';
import Measure from './models/measure';
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
    await Customer.sync({ alter: isDev })
    await Measure.sync({ alter: isDev })    
};

export default dbInit 