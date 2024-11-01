export interface IBackdropSingletonItem {
  n: number;
  zIndex: number;
}

export interface IBackdropGlobal {
  n?: number;
  items?: IBackdropSingletonItem[];
}

export interface IBackdropWindow {
  __backdrop_singleton__?: IBackdropGlobal;
}

export interface IMessageData<T = void> {
  source: string;
  type: string;
  payload: T;
}