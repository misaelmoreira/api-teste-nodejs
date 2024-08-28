import { Router } from 'express'
import measureRouter from './measure'

const router = Router()

router.use('/upload', measureRouter)

export default router