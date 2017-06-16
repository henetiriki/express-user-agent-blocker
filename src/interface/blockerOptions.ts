/**
 * Options for sending an alternative message to blocked UAs
 */
export interface Options {
  /**
   * Optional HTML to render
   */
  html?: string,
  /**
   * Optional plain message to send
   */
  text?: string,
}
