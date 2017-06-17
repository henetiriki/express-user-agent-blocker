export type LogType = (message: string) => void

/**
 * Custom logger object
 * @interface
 */
export interface Log {
  /**
   * Custom log function
   * @param {string} message the message to log
   */
  log: LogType
}
