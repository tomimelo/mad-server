import { NextFunction, Request, Response } from "express";

export type MadHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void 