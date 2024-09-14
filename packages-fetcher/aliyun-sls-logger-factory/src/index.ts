export { default } from './factory/create-logger';
export { default as createLoggerFactory } from './factory/create-logger-factory';

export type {
  ISlsFactoryOptions as SlsFactoryOptions,
  ISlsFactory as SlsFactory,
  ISlsLog as SlsLog,
  ISlsLogOptions as SlsLogOptions,
  ISlsLogOptionsQuick as SlsLogOptionsQuick
} from './types';