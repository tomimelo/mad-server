import { Router as ExpressRouter} from "express";
import { RouteDescription } from "./route-description";

export abstract class Router {
  public getBasePath(): string {
    throw new Error('Method not implemented')
  }
  public getRouter(): ExpressRouter {
    throw new Error('Method not implemented')
  }
  public getRoutes(): ReadonlyArray<RouteDescription> {
    throw new Error('Method not implemented')
  }
}