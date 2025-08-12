import {
  ErrorInfo,
  ReactNode
} from 'react';

export interface IErrorStackItem {
  name: string;
  url: string;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
  onErrorCaught?(error: Error, errorInfo: ErrorInfo): void;
}

export interface IErrorBoundaryState {
  error: null | Error;
  errorInfo?: ErrorInfo;
}
