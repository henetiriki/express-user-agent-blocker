import {NextFunction, Request, RequestHandler, Response} from 'express'

import {Options} from './interfaces'
import {buildUaBlockRegex, getLogger, isBlockUa, readUa, respondToBlockedUa} from './modules'

/**
 * Express middleware function to restrict access based on User Agent
 * @param {string[]} userAgentToBlock
 *          one or more (partial) User Agent strings to block
 *          e.g. ['Baiduspider', 'SomeHorridUA']
 * @param {Options} [options]
 *          one of {@code html} or {@code text} to send in place of the JSON default message
 *          can also include a {@code log} function to handle debug logging
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
const blocker = (userAgentToBlock: string[], options?: Options): RequestHandler => {
  const log: any = getLogger('euab:index', options)
  const blockRegex: RegExp = buildUaBlockRegex(userAgentToBlock)
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
