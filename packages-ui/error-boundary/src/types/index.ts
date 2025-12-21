import {
  ErrorInfo,
  ReactNode
} from 'react';

export interface IErrorStackItem {
  name: string;
  url: string;
}

export interface IErrorCaught {
  error: unknown;
  errorInfo?: ErrorInfo;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
  /**
   * 错误备用 UI：支持静态节点或函数（传递错误和重置方法）
   */
  fallback?: ReactNode | ((error: unknown, errorInfo?: ErrorInfo) => ReactNode);
  /**
   * 重置触发信号，当该值变化时，会清空错误状态（适配路由切换等场景）
   */
  resetSignal?: unknown;
  /**
   * 可用于做进行错误日志上报
   */
  onErrorCaught?(error: unknown, errorInfo: ErrorInfo): void;
}

export interface IErrorBoundaryState {
  caught: IErrorCaught | null;
}
