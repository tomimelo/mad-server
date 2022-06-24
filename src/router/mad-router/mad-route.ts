import { NextFunction, Request, Response } from 'express'
import { Middleware } from '../../middleware/middleware'

export interface MadRoute {
  path: string,
  method: string,
  middlewares?: ReadonlyArray<Middleware>,
  handler: (req: Request, res: Response, next?: NextFunction) => void | Promise<void>
}