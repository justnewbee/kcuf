import {
  IErrorCaught
} from '../types';

export default function getErrorMessage(caught: IErrorCaught): string {
  const {
    error
  } = caught;
  
  if (!error) {
    return 'EmptyError'; // 可能 throw null undefined '' 等
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return (error as Error).toString();
}
