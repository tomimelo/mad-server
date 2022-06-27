import { MadHandler } from './mad-handler'
import { MadRouteMethod } from './mad-route-method'

export interface MadRoute {
  path: string,
  method: MadRouteMethod,
  middlewares?: ReadonlyArray<MadHandler>,
  handler: MadHandler
}