import {Response} from 'express'

import {Options} from '../index.d'
import {getLogger} from './'

const defaultMessage = {
  message: 'Nothing to see here - move along please...',
}

/**
 * Responds to a blocked user agent, either with the default message, or an optional custom message
 * @param {Response} res the response object
 * @param {Options} [options] will respond with a custom {@link Options#html} or {@link Options#text} message, if set
 */
const respondToBlockedUa = (res: Response, options: Options = {html: '', text: ''}): void => {
  const log: any = getLogger('euab:respondToBlockedUa', options)

  if (options.html || options.text) {
    log(`responding to request with ${options.html ? 'html' : 'text'}: ${options.html || options.text}`)
    res.status(200).send(options.html || options.text)
    return
  }

  log(`responding to request with default message: ${JSON.stringify(defaultMessage)}`)
  res.status(200).json(defaultMessage)
}

export {respondToBlockedUa}
