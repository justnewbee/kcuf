import {
  getWindow
} from '@kcuf/sandbox-escape';

import {
  TTargetWindow
} from '../types';

let resolved = false;
let cachedThisWindow: Window | null = null;

// 延迟解析，避免在 SSR / 非浏览器环境下顶层就抛错（getWindow 的最终兜底是裸 `window`）
function resolveThisWindow(): Window | null {
  if (resolved) {
    return cachedThisWindow;
  }

  resolved = true;

  if (typeof window === 'undefined') {
    return null;
  }

  try {
    cachedThisWindow = getWindow();
  } catch {
    cachedThisWindow = null;
  }

  return cachedThisWindow;
}

export default function getTargetWindow(targetWindow?: TTargetWindow): Window | null {
  const thisWindow = resolveThisWindow();

  if (targetWindow === 'top') {
    return thisWindow?.top ?? thisWindow;
  }

  if (targetWindow === 'parent') {
    return thisWindow?.parent ?? null;
  }

  return targetWindow ?? thisWindow;
}
