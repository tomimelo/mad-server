import { RouterOptions as ExpressRouterOptions } from 'express'
import { MadHandler } from './mad-handler'
import { MadRoute } from './mad-route'
import { Router } from '../router'

export interface MadRouterConfig {
  options?: ExpressRouterOptions,
  preMiddlewares?: ReadonlyArray<MadHandler>,
  baseUrl: string,
  name?: string,
  handlers: ReadonlyArray<MadRoute | Router>
}
