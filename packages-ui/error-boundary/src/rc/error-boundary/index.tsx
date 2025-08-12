import {
  ReactNode,
  ErrorInfo,
  Component
} from 'react';

import {
  IErrorBoundaryProps,
  IErrorBoundaryState
} from '../../types';
import ErrorDisplay from '../error-display';

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    error: null
  };
  
  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return {
      error
    };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });
    
    this.props.onErrorCaught?.(error, errorInfo);
  }
  
  render(): ReactNode {
    const {
      props: {
        children
      },
      state: {
        error,
        errorInfo
      }
    } = this;
    
    return error ? <ErrorDisplay error={error} errorInfo={errorInfo} /> : children;
  }
}
