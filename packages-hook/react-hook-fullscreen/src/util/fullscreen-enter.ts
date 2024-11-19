import {
  IElement
} from '../types';

export default async function fullscreenEnter(element: HTMLElement): Promise<void> {
  const el = element as IElement;
  
  return el.requestFullscreen?.() || el.msRequestFullscreen?.() || el.webkitEnterFullscreen?.() || el.webkitRequestFullscreen?.() || el.mozRequestFullscreen?.();
}
