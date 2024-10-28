const MAPPING: Record<string, string> = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  '↑': 'ArrowUp',
  '↓': 'ArrowDown',
  '←': 'ArrowLeft',
  '→': 'ArrowRight',
  '↵': 'Enter',
  '↩': 'Enter',
  '⏎': 'Enter',
  '␣': 'Space',
  '⎋': 'Escape',
  '⇥': 'Tab',
  '⇞': 'PageUp',
  '⇟': 'PageDown',
  '⌫': 'Backspace',
  '⌦': 'Delete'
};

/**
 * 将输入规整成 `KeyboardEvent.code`，让配置得以使用 Alias 进行配置
 */
export default function normalizeKey(key: string): string {
  return MAPPING[key.toUpperCase()] || key;
}