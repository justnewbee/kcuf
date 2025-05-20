export interface IHijackResult {
  href: string;
  pathname: string;
  search: string;
  hash: string;
}

export interface IReactRouterClickHijackerProps {
  ignore?(el: HTMLElement): boolean;
}
