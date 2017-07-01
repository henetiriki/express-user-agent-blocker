import {IDebugger} from 'debug'
import debug from 'debug'

import {LogType, Options} from '../index.d'

/**
 * Get a logger for a particular namespace, or return a custom log function
 * @param {string} namespace - the namespace to log for
 * @param {Options} [options] - optional options which may contain custom log function
 * @returns {Log} the log function
 */
const getLogger = (namespace: string, options: Options = {logger: undefined}): IDebugger|LogType => {
  if (options.logger && options.logger.log instanceof Function) {
    return options.logger.log
  }

  const logger: IDebugger = debug(namespace)
  logger.log = console.log.bind(console)

  return logger
}

export {getLogger}
