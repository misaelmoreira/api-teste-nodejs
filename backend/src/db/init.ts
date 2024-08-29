import Measure from './models/measure'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Measure.sync({ alter: isDev })
}

export default dbInit 