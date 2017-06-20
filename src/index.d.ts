export type LogType = (message: string) => void

export interface Log {
  log: LogType
}

export interface Options {
  html?: string,
  text?: string,
  logger?: Log,
}
