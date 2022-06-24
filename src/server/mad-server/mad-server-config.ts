import { Middleware } from '../../middleware/middleware'
import { MadRouteDescription } from '../../router/mad-router/mad-route-description'
import { Router } from '../../router/router'
import { Logger } from '../../utils/logger'

export interface MadServerConfig {
  port: number,
  router: Router,
  preMiddlewares?: ReadonlyArray<Middleware>,
  postMiddlewares?: ReadonlyArray<Middleware>,
  logger?: Logger,
  routePrinter?: (routes: ReadonlyArray<MadRouteDescription>) => void
}
