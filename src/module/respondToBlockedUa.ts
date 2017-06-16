import {Response} from 'express'

import {Options} from '../interface/blockerOptions'

const defaultMessage = {
  message: 'Nothing to see here - move along please...',
}

const defaultOptions: Options = {
  html: '',
  text: '',
}

const respondToBlockedUa = (res: Response, options: Options = defaultOptions): void => {
  options.html || options.text
    ? res.status(200).send(options.html || options.text)
    : res.status(200).json(defaultMessage)
}

export {respondToBlockedUa}
