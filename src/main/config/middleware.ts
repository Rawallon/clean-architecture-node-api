import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

export default function SetupMiddlewares (app: Express): void {
  app.use(bodyParser)
}
