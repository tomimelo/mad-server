import { Router as ExpressRouter } from 'express'
import { MadRoute } from './mad-route';
import { MadRouteDescription } from './mad-route-description';
import { MadRouterConfig } from './mad-router-config';
import { Router } from '../router'
import { MadRouteMethod } from './mad-route-method';

export class MadRouter implements Router {
  private router: ExpressRouter = ExpressRouter()
  private basePath: string;
  private routes: Array<MadRouteDescription> = [];
  private name: string;
  constructor (private readonly routerOptions: MadRouterConfig) {
    this.basePath = this.routerOptions.basePath
    this.name = this.routerOptions.name || ''
    this.setupRouter()
  }

  public getBasePath (): string {
    return this.basePath
  }

  public getRouter (): ExpressRouter {
    return this.router
  }

  public getRoutes (): ReadonlyArray<MadRouteDescription> {
    return this.routes
  }

  private setupRouter (): void {
    this.routerOptions.handlers.forEach(routerHandler => {
      if (routerHandler instanceof MadRouter) {
        this.router.use(routerHandler.getBasePath(), routerHandler.getRouter())
        routerHandler.getRoutes().forEach(route => {
          this.addRoute(route)
        })
      } else {
        assertRouterHandlerIsRoute(routerHandler)
        switch (routerHandler.method.toUpperCase()) {
          case MadRouteMethod.GET:
            this.router.get(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case MadRouteMethod.POST:
            this.router.post(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case MadRouteMethod.PUT:
            this.router.put(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case MadRouteMethod.DELETE:
            this.router.delete(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          default:
            throw new Error(`Method ${routerHandler.method.toUpperCase()} not supported.`)
        }
        const routeDescription = this.createRouteDescription(routerHandler)
        this.addRoute(routeDescription)
      }
    })
  }


  private createRouteDescription (route: MadRoute): MadRouteDescription {
    return {
      path: route.path,
      method: route.method,
      handler: this.getHandlerName(route.handler)
    }
  }

  private getHandlerName (handler: Function): string {
    const handlerName = handler.name.replace(/^bound /, '')
    return this.name ? `${this.name}.${handlerName}` : handlerName
  }

  private addRoute (routeDescription: MadRouteDescription): void {
    this.routes.push({
      method: routeDescription.method,
      path: `${this.basePath}${routeDescription.path}`,
      handler: routeDescription.handler
    })
  }
}

function assertRouterHandlerIsRoute(routerHandler: MadRoute | MadRouter): asserts routerHandler is MadRoute {
  if (routerHandler instanceof MadRouter) {
    throw Error('routerHandler must be of type MadRoute');
  }
}
