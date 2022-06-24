import { Request, Response } from 'express'
import { Middleware } from '../middleware/middleware'

export interface Route {
  path: string,
  method: string,
  middlewares: ReadonlyArray<Middleware>,
  handler: (req: Request, res: Response) => void | Promise<void>
}