import Customer from './models/customer';
import Measure from './models/measure';
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
    try {
        await Customer.sync({ alter: isDev })
        await Measure.sync({ alter: isDev })

        const existingCustomer = await Customer.findAll();

        // Se o cliente não existir, criar um novo
        if (existingCustomer.length > 0) {
            console.log(`Customer ja created`);
        } else {
            // Criar 3 instâncias de Customer
            const customers = [
                { id: '1', name: 'John Doe' },
                { id: '2', name: 'Jane Smith' },
                { id: '3', name: 'Alice Johnson' }
            ];

            for (const customer of customers) {
                // Verificar se o cliente já existe
                await Customer.create(customer);

                console.log(`Customer already create: ${customer.name}`);
            }
        }
        console.log('Customers created successfully.');
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

export default dbInit 