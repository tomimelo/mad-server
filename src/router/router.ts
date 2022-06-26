import { Router as ExpressRouter} from "express";
import { MadRouteDescription } from "./mad-router/mad-route-description";

export interface Router {
  getBaseUrl(): string,
  getRouter(): ExpressRouter,
  getRoutes(): ReadonlyArray<MadRouteDescription>
}