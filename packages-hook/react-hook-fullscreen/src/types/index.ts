export interface IDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?(): Promise<void>;
  mozCancelFullScreen?(): Promise<void>;
  msExitFullscreen?(): Promise<void>;
}

export interface IElement extends Element {
  webkitEnterFullscreen?(): Promise<void>;
  webkitRequestFullscreen?(): Promise<void>;
  mozRequestFullscreen?(): Promise<void>;
  msRequestFullscreen?(): Promise<void>;
}

export interface IListenCallbacks {
  onFullscreen(this: Element, event: Event): void;
  onError(this: Element, event: Event): void;
}
