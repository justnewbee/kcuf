import {
  IListenCallbacks
} from '../types';

const PREFIXES = ['', 'webkit', 'moz', 'ms'];

// const PREFIXED_CHANGE_EVENTS = [
//   'fullscreenchange',
//   'webkitfullscreenchange',
//   'webkitfullscreenchange',
//   'mozfullscreenchange',
//   'MSFullscreenChange'
// ];
//
// const PREFIXED_ERRROR_EVENTS = [
//   'fullscreenerror',
//   'webkitfullscreenerror',
//   'webkitfullscreenerror',
//   'mozfullscreenerror',
//   'MSFullscreenError'
// ];

export default function fullscreenListen(element: HTMLElement, {
  onFullscreen,
  onError
}: IListenCallbacks) {
  // if (document.fullscreenEnabled) {
  //   element.addEventListener('fullscreenchange', onFullscreen);
  //   element.addEventListener('fullscreenerror', onError);
  // }
  
  PREFIXES.forEach(prefix => {
    element.addEventListener(`${prefix}fullscreenchange` as 'fullscreenchange', onFullscreen);
    element.addEventListener(`${prefix}fullscreenerror` as 'fullscreenerror', onError);
  });
  
  return () => {
    PREFIXES.forEach(prefix => {
      element.removeEventListener(`${prefix}fullscreenchange` as 'fullscreenchange', onFullscreen);
      element.removeEventListener(`${prefix}fullscreenerror` as 'fullscreenerror', onError);
    });
  };
}
