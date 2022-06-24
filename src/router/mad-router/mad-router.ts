import { Router as ExpressRouter } from 'express'
import { Route } from '../route';
import { RouteDescription } from '../route-description';
import { RouterOptions } from '../route-options';
import { Router } from '../router'

export class MadRouter implements Router {
  private router: ExpressRouter = ExpressRouter()
  private basePath: string;
  private routes: Array<RouteDescription> = [];
  private name: string;
  constructor (private readonly routerOptions: RouterOptions) {
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

  public getRoutes (): ReadonlyArray<RouteDescription> {
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
            this.router.get(routerHandler.path, ...[...routerHandler.middlewares, routerHandler.handler])
            break
          case 'POST':
            this.router.post(routerHandler.path, ...[...routerHandler.middlewares, routerHandler.handler])
            break
          case 'PUT':
            this.router.put(routerHandler.path, ...[...routerHandler.middlewares, routerHandler.handler])
            break
          case 'DELETE':
            this.router.delete(routerHandler.path, ...[...routerHandler.middlewares, routerHandler.handler])
            break
          default:
            throw new Error(`Method ${routerHandler.method.toUpperCase()} not supported.`)
        }
        const routeDescription = this.createRouteDescription(routerHandler)
        this.addRoute(routeDescription)
      }
    })
  }


  private createRouteDescription (route: Route): RouteDescription {
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

  private addRoute (routeDescription: RouteDescription): void {
    this.routes.push({
      method: routeDescription.method.toUpperCase(),
      path: `${this.basePath}${routeDescription.path}`,
      handler: routeDescription.handler
    })
  }
}

function assertRouterHandlerIsRoute(routerHandler: Route | Router): asserts routerHandler is Route {
  if (routerHandler instanceof Router) {
    throw Error('routerHandle must be of type Route');
  }
}
