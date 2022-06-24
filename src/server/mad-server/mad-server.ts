import express from 'express'
import { Server } from '../server'
import assert from 'assert'
import { MadServerConfig } from './mad-server-config'
import { Logger } from '../../utils/logger'
import { ConsoleLogger } from '../../utils/console-logger'
import { Router } from '../../router/router'
import { RouteDescription } from '../../router/route-description'

export class MadServer implements Server {
  private app: express.Application = express()
  private logger: Logger
  private router: Router;
  private port: number;

  constructor(private readonly config: MadServerConfig) {
    assert.ok(this.config.port, `Can't create MadServer without port, got ${this.config.port}`)
    this.port = this.config.port
    this.logger = this.config.logger || ConsoleLogger
    this.router = this.config.router
    this.init()
  }

  public async start(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.app.listen(this.port, () => {
        resolve()
        this.logger.info(`✓ Server listening on port ${this.port}`)
      })
    })
  }

  private init(): void {
    this.setupServer()
    this.printRoutes()
  }

  private setupServer(): void {
    this.setPreMiddlewares()
    this.initRouter()
    this.setPostMiddlewares()
  }

  private setPreMiddlewares(): void {
    this.config.preMiddlewares.forEach(middleware => {
      this.app.use(middleware)
    })
  }

  private setPostMiddlewares(): void {
    this.config.postMiddlewares.forEach(middleware => {
      this.app.use(middleware)
    })
  }

  private initRouter(): void {
    this.app.use(this.router.getBasePath(), this.router.getRouter())
  }

  public getRoutes(): ReadonlyArray<RouteDescription> {
    return this.router.getRoutes()
  }

  private printRoutes(): void {
    const routePrinter = this.config.routePrinter
    if (routePrinter) {
      routePrinter(this.getRoutes())
    }
  }
}
