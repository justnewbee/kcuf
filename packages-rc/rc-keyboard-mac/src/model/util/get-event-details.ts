import {
  IKeyDetails
} from '../types';

export default function getEventDetails(e: KeyboardEvent): IKeyDetails {
  return {
    ctrl: e.ctrlKey,
    alt: e.altKey,
    shift: e.shiftKey,
    meta: e.metaKey,
    key: e.key === ' ' ? '␣' : e.key,
    code: e.code,
    keyCode: e.keyCode
  };
}