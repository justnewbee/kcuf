import {
  EFetchErrorName
} from '../enum';

export default function createError(name: EFetchErrorName, message: string): Error {
  const error = new Error(message);
  
  error.name = name; // Error 对象的默认 name 是 'Error'
  
  return error;
}
