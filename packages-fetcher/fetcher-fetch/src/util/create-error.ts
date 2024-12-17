import {
  EFetchErrorName
} from '../enum';

export default function createError(name: EFetchErrorName, message: string): Error {
  const error = new Error(message);
  
  error.name = name;
  
  return error;
}
