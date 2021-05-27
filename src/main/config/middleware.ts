import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export default function SetupMiddlewares (app: Express): void {
  app.use(bodyParser)
  app.use(cors)
}
