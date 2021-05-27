import express from 'express'
import SetupMiddlewares from './middleware'

const app = express()
SetupMiddlewares(app)

export default app
