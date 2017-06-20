import {RequestHandler} from 'express'

// Project: express-user-agent-blocker
// Definitions by: Louw Swart <http://ouq77.kiwi>

/**
 * Custom log function
 * @param message the message to log
 */
export type LogType = (message: string) => void

/**
 * Custom logger object
 * @interface
 */
export interface Log {
  /** Custom log function */
  log: LogType
}

/**
 * Options for sending an alternative message to blocked UAs
 * @interface
 */
export interface Options {
  /** Optional HTML to render */
  html?: string,
  /** Optional plain message to send */
  text?: string,
  /** Optional log function to handle debug logging */
  logger?: Log,
}

/**
 * Express middleware function to restrict access based on User Agent
 * @function
 * @param userAgentToBlock
 *          one or more (partial) User Agent strings to block
 *          e.g. ['Baiduspider', 'SomeHorridUA']
 * @param options
 *          one of {@code html} or {@code text} to send in place of the JSON default message
 *          can also include a {@code log} function to handle debug logging
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
export const blocker: (userAgentToBlock: string[], options?: Options) => RequestHandler
