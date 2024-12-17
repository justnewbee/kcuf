import {
  EXhrErrorName
} from '../enum';

export default function createError(name: EXhrErrorName | 'AbortError', message: string): Error {
  const error = new Error(message);
  
  error.name = name;
  
  return error;
}
