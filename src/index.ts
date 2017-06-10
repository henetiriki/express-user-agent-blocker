import {NextFunction, Request, RequestHandler, Response} from 'express'

/**
 * Express middleware function to restrict access based on User Agent
 * @param {Array<String>} userAgentToBlock
 *          one or more (partial) User Agent strings to block
 *          e.g. ['Baiduspider', 'SomeHorridUA']
 * @returns {(req:Request, res:Response, next:NextFunction)=>RequestHandler}
 */
const euaBlocker = (userAgentToBlock: string[]): RequestHandler => {
  const blockRegex = new RegExp(`^.*(${userAgentToBlock.join('|').toLowerCase()}).*$`)
  return (req: Request, res: Response, next: NextFunction) => {
    const userAgent = (req.headers['user-agent'] || '').trim()

    if (blockRegex.exec(userAgent.toLowerCase())) {
      console.log(`Disallowing access to request from UA '${userAgent}'`)
      res.status(200).json({message: 'Nothing to see here - move along please...'})

      return;
    }

    next()
  }
}

export = euaBlocker
