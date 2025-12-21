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
    caught: null
  };
  
  static getDerivedStateFromError(error: unknown): IErrorBoundaryState {
    return {
      caught: {
        error
      }
    };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      caught: {
        error,
        errorInfo
      }
    });
    
    this.props.onErrorCaught?.(error, errorInfo);
  }
  
  componentDidUpdate(prevProps: IErrorBoundaryProps): void {
    if (this.props.resetSignal !== prevProps.resetSignal && this.state.caught) {
      this.setState({
        caught: null
      });
    }
  }
  
  render(): ReactNode {
    const {
      props: {
        children,
        fallback
      },
      state: {
        caught
      }
    } = this;
    
    if (!caught) {
      return children;
    }
    
    if (!fallback) {
      return <ErrorDisplay error={caught.error} errorInfo={caught.errorInfo} />;
    }
    
    if (typeof fallback === 'function') {
      return fallback(caught.error, caught.errorInfo);
    }
    
    return fallback;
  }
}
