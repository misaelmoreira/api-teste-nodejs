import Customer from './models/customer';
import Measure from './models/measure';
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
    try {
        await Customer.sync({ alter: isDev })
        await Measure.sync({ alter: isDev })
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

export default dbInit 