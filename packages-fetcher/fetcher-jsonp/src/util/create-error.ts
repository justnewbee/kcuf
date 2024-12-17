import {
  EJsonpErrorName
} from '../enum';

export default function createError(name: EJsonpErrorName | 'AbortError', message: string): Error {
  const error = new Error(message);
  
  error.name = name;
  
  return error;
}
