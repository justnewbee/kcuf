import {
  IErrorCaught
} from '../types';

export default function getErrorStack(caught: IErrorCaught): string {
  const {
    error,
    errorInfo
  } = caught;
  
  return (error as Error | undefined)?.stack || errorInfo?.componentStack || '';
}
