export interface ICreateInterceptorOptions {
  needLogin(code: string): boolean;
  doLogin(): Promise<void>;
  headerKeys?: string[];
}
