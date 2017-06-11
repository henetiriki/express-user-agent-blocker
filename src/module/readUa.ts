import {Request} from '@types/express'

const readUa = (req: Request) =>
  (req.headers['user-agent'] || '').trim()

export {readUa}
