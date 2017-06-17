import {Log} from './'

/**
 * Options for sending an alternative message to blocked UAs
 * @interface
 */
export interface Options {
  /** Optional HTML to render */
  html?: string,
  /** Optional plain message to send */
  text?: string,
  /** Optional log function to handle debug logging */
  logger?: Log,
}
