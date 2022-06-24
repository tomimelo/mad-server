import { NextFunction, Request, Response } from "express";

export type MadErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => Promise<void> | void 