import { RouterOptions as ExpressRouterOptions } from 'express'
import { Middleware } from '../../middleware/middleware'
import { MadRoute } from './mad-route'
import { Router } from '../router'

export interface MadRouterOptions {
  options?: ExpressRouterOptions,
  preMiddlewares?: ReadonlyArray<Middleware>,
  basePath: string,
  name?: string,
  handlers: ReadonlyArray<MadRoute | Router>
}
