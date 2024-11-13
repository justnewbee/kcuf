import {
  ICreateLoggerOptions,
  ISlsLogOptionsQuick,
  ISlsLogOptions
} from './options';

export type TLogArgs = [string, Record<string, unknown>?] | [ISlsLogOptions, string, Record<string, unknown>?];
export type TLogQuickArgs = [string, Record<string, unknown>?] | [ISlsLogOptionsQuick, string, Record<string, unknown>?];

export interface ISlsLogFn {
  (topic: string): void;
  <P extends object>(topic: string, payload: P): void;
  (options: ISlsLogOptions, topic: string): void;
  <P extends object>(options: ISlsLogOptions, topic: string, payload: P): void;
}

export interface ISlsLogFnQuick {
  (topic: string): void;
  <P extends object>(topic: string, payload: P): void;
  (options: ISlsLogOptionsQuick, topic: string): void;
  <P extends object>(options: ISlsLogOptionsQuick, topic: string, payload: P): void;
}

export interface ISlsLogger {
  (topic: string): void;
  <P extends object>(topic: string, payload: P): void;
  (options: ISlsLogOptions, topic: string): void;
  <P extends object>(options: ISlsLogOptions, topic: string, payload: P): void;
  debug: ISlsLogFnQuick;
  log: ISlsLogFnQuick;
  info: ISlsLogFnQuick;
  warn: ISlsLogFnQuick;
  error: ISlsLogFnQuick;
  fatal: ISlsLogFnQuick;
}

export type ICreateLogger = (options: ICreateLoggerOptions) => ISlsLogger;
