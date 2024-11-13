export { default } from './factory/create-logger';
export { default as generateCreateLoggerBase } from './factory/generate-create-logger';

export type {
  ICreateLogger as CreateLogger,
  ICreateLoggerOptions as CreateLoggerOptions,
  IGenerateCreateLoggerOptions as GenerateCreateLoggerOptions,
  ISlsLogger as SlsLogger,
  ISlsLogOptions as SlsLogOptions,
  ISlsLogOptionsQuick as SlsLogOptionsQuick,
  ISlsPostBody as SlsPostBody
} from './types';
