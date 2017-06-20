import {NextFunction, Request, RequestHandler, Response} from 'express'

import {Options} from './index.d'
import {buildUaBlockRegex, getLogger, isBlockUa, readUa, respondToBlockedUa} from './modules'

/**
 * Custom log function
 * @typedef {function} LogType
 * @function
 * @param {string} message the message to log
 */

/**
 * Custom logger object
 * @typedef {object} Log
 * @interface
 * @property {LogType} log - Custom log function
 */

/**
 * Options for sending an alternative message to blocked UAs, or defining a custom logger
 * @typedef {object} Options
 * @interface
 * @property {string} [html] - optional HTML to render
 * @property {string} [text] - optional plain message to send
 * @property {Log} [log] - optional log function to handle debug logging
 */

/**
 * Express middleware function to restrict access based on User Agent
 * @function
 * @param {string[]} userAgentToBlock - one or more (partial) User Agent strings to block, e.g. ['Baiduspider', 'SomeHorridUA']
 * @param {Options} [options] - one of {@link Options#html} or {@link Options#text} to send in place of the JSON default message; can also include a {@link Options#log} function to handle debug logging
 * @example
 * blocker(['Baiduspider', 'SomeHorridUA'], {html: '<h1>Let me make a bologna sandwich...</h1>'})
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
const blocker = (userAgentToBlock: string[], options?: Options): RequestHandler => {
  const log: any = getLogger('euab:index', options)
  const blockRegex: RegExp = buildUaBlockRegex(userAgentToBlock, options)
  return (req: Request, res: Response, next: NextFunction) => {
    if (blockRegex) {
      const userAgent = readUa(req)
      if (isBlockUa(blockRegex, userAgent)) {
        log(`Disallowing access to request from UA '${userAgent}'`)
        respondToBlockedUa(res, options)
        return
      }
    }
    next()
  }
}

export = blocker
