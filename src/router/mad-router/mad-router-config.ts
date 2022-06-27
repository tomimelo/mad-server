import { RouterOptions as ExpressRouterOptions } from 'express'
import { MadHandler } from './mad-handler'
import { MadRoute } from './mad-route'
import { MadRouter } from './mad-router'

export interface MadRouterConfig {
  options?: ExpressRouterOptions,
  preMiddlewares?: ReadonlyArray<MadHandler>,
  basePath: string,
  name?: string,
  handlers: ReadonlyArray<MadRoute | MadRouter>
}
