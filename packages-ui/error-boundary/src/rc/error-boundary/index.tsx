import {
  ReactNode,
  ErrorInfo,
  Component,
  captureOwnerStack
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
    const componentStack = errorInfo.componentStack;
    const ownerStack = captureOwnerStack();
    
    this.setState({
      caught: {
        error,
        componentStack,
        ownerStack
      }
    });
    
    this.props.onErrorCaught?.(error, componentStack, ownerStack);
  }
  
  componentDidUpdate(prevProps: IErrorBoundaryProps): void {
    if (this.props.resetSignal !== prevProps.resetSignal && this.state.caught) {
      this.setState({ // eslint-disable-line @eslint-react/no-set-state-in-component-did-update
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
      return <ErrorDisplay {...caught} />;
    }
    
    if (typeof fallback === 'function') {
      return fallback(caught.error, caught.componentStack, caught.ownerStack);
    }
    
    return fallback;
  }
}
