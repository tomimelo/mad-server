import { MadRouteMethod } from "./mad-route-method";

export interface MadRouteDescription {
  path: string,
  method: MadRouteMethod,
  handler: string
}
