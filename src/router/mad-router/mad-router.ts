import { Router as ExpressRouter } from 'express'
import { MadRoute } from './mad-route';
import { MadRouteDescription } from './mad-route-description';
import { MadRouterOptions } from './mad-route-options';
import { Router } from '../router'

export class MadRouter implements Router {
  private router: ExpressRouter = ExpressRouter()
  private basePath: string;
  private routes: Array<MadRouteDescription> = [];
  private name: string;
  constructor (private readonly routerOptions: MadRouterOptions) {
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
      if (routerHandler instanceof Router) {
        this.router.use(routerHandler.getBasePath(), routerHandler.getRouter())
        routerHandler.getRoutes().forEach(route => {
          this.addRoute(route)
        })
      } else {
        assertRouterHandlerIsRoute(routerHandler)
        switch (routerHandler.method.toUpperCase()) {
          case 'GET':
            this.router.get(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case 'POST':
            this.router.post(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case 'PUT':
            this.router.put(routerHandler.path, ...(routerHandler.middlewares || []), routerHandler.handler)
            break
          case 'DELETE':
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
      method: routeDescription.method.toUpperCase(),
      path: `${this.basePath}${routeDescription.path}`,
      handler: routeDescription.handler
    })
  }
}

function assertRouterHandlerIsRoute(routerHandler: MadRoute | Router): asserts routerHandler is MadRoute {
  if (routerHandler instanceof Router) {
    throw Error('routerHandle must be of type Route');
  }
}
