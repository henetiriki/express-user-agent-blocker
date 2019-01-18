export type LogType = (message: string) => void

export interface Log {
  log: LogType
}
