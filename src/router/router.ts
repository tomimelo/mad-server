import { Router as ExpressRouter} from "express";
import { MadRouteDescription } from "./mad-router/mad-route-description";

export abstract class Router {
  public getBasePath(): string {
    throw new Error('Method not implemented')
  }
  public getRouter(): ExpressRouter {
    throw new Error('Method not implemented')
  }
  public getRoutes(): ReadonlyArray<MadRouteDescription> {
    throw new Error('Method not implemented')
  }
}