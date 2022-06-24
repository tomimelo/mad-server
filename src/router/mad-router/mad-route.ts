import { MadHandler } from './mad-handler'

export interface MadRoute {
  path: string,
  method: string,
  middlewares?: ReadonlyArray<MadHandler>,
  handler: MadHandler
}