import { MadHandler } from '../../router/mad-router/mad-handler'
import { MadRouteDescription } from '../../router/mad-router/mad-route-description'
import { Router } from '../../router/router'
import { Logger } from '../../utils/logger'

export interface MadServerConfig {
  port: number,
  router: Router,
  parseJson?: boolean,
  preMiddlewares?: ReadonlyArray<MadHandler>,
  postMiddlewares?: ReadonlyArray<MadHandler>,
  logger?: Logger,
  routePrinter?: (routes: ReadonlyArray<MadRouteDescription>) => void
}
