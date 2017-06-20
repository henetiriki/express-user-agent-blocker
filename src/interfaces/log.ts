/**
 * @param {string} message the message to log
 */
export type LogType = (message: string) => void

/**
 * Custom logger object
 * @interface
 */
export interface Log {
  /**
   * Custom log function
   */
  log: LogType
}
