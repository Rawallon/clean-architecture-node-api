import express from 'express'
import SetupMiddlewares from './middleware'
import SetupRoutes from './routes'

const app = express()
SetupMiddlewares(app)
SetupRoutes(app)

export default app
