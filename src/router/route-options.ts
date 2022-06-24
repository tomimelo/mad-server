import { RouterOptions as ExpressRouterOptions } from 'express'
import { Middleware } from '../middleware/middleware'
import { Route } from './route'
import { Router } from './router'

export interface RouterOptions {
  options?: ExpressRouterOptions,
  preMiddlewares?: ReadonlyArray<Middleware>,
  basePath: string,
  name?: string,
  handlers: ReadonlyArray<Route | Router>
}
