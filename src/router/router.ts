import { Router as ExpressRouter} from "express";
import { MadRouteDescription } from "./mad-router/mad-route-description";

export interface Router {
  getBasePath(): string,
  getRouter(): ExpressRouter,
  getRoutes(): ReadonlyArray<MadRouteDescription>
}