import Customer from './models/customer';
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
    await Customer.sync({ alter: isDev })
};

export default dbInit 