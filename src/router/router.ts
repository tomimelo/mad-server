import { Router as ExpressRouter} from "express";
import { RouteDescription } from "./route-description";

export interface Router {
  getBasePath: () => string,
  getRouter: () => ExpressRouter,
  getRoutes: () => ReadonlyArray<RouteDescription>
}