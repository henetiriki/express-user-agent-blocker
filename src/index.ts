import {NextFunction, Request, RequestHandler, Response} from 'express'

import {buildUaBlockRegex, isBlockUa, readUa} from './module'

/**
 * Express middleware function to restrict access based on User Agent
 * @param {string[]} userAgentToBlock
 *          one or more (partial) User Agent strings to block
 *          e.g. ['Baiduspider', 'SomeHorridUA']
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
const blocker = (userAgentToBlock: string[]): RequestHandler => {
  const blockRegex = buildUaBlockRegex(userAgentToBlock)
  return (req: Request, res: Response, next: NextFunction) => {
    if (blockRegex) {
      const userAgent = readUa(req)

      if (isBlockUa(blockRegex, userAgent)) {
        console.log(`Disallowing access to request from UA '${userAgent}'`)
        res.status(200).json({message: 'Nothing to see here - move along please...'})

        return
      }
    }

    next()
  }
}

export = blocker
