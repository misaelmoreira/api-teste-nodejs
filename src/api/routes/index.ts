import { Router } from 'express'
import measureRouter from './measure'

const router = Router()

router.use('/', measureRouter)

export default router