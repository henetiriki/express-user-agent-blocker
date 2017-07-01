import {Request} from 'express'

/**
 * Reads the user agent from the request
 * @param {Request} req - the request object
 * @return {string} the user agent if present in the request
 */
const readUa = (req: Request): string => {
  let ua: string = req.headers['user-agent'] as string
  ua = ua || ''

  return ua.trim()
}

export {readUa}
