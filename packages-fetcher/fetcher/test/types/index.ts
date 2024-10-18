export interface IMockApi {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  match?: string | RegExp;
  result: unknown;
  timeout?: number;
}