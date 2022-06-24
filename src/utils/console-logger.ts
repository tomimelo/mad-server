import { Logger } from "./logger";

export const ConsoleLogger: Logger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
  debug: console.log
}