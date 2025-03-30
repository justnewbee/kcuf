import {
  EFetchSseErrorName
} from '../enum';

export default function createFetchSseError(name: EFetchSseErrorName, message: string): Error {
  const error = new Error(message);
  
  error.name = name;
  
  return error;
}
