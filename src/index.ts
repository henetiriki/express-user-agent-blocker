import {NextFunction, Request, RequestHandler, Response} from 'express'

import {Options} from './interface/blockerOptions'
import {buildUaBlockRegex, isBlockUa, readUa, respondToBlockedUa} from './module'

/**
 * Express middleware function to restrict access based on User Agent
 * @param {string[]} userAgentToBlock
 *          one or more (partial) User Agent strings to block
 *          e.g. ['Baiduspider', 'SomeHorridUA']
 * @param {Options} [options]
 *          one of html or text to send in place of the JSON default message
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
const blocker = (userAgentToBlock: string[], options?: Options): RequestHandler => {
  const blockRegex = buildUaBlockRegex(userAgentToBlock)
  return (req: Request, res: Response, next: NextFunction) => {
    if (blockRegex) {
      const userAgent = readUa(req)
      if (isBlockUa(blockRegex, userAgent)) {
        console.log(`Disallowing access to request from UA '${userAgent}'`)
        respondToBlockedUa(res, options)
        return
      }
    }
    next()
  }
}

export = blocker
