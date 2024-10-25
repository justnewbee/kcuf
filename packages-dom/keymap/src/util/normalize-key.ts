const MAPPING: Record<string, string> = {
  '↑': 'ArrowUp',
  '↓': 'ArrowDown',
  '←': 'ArrowLeft',
  '→': 'ArrowRight',
  '↵': 'Enter',
  '↩': 'Enter',
  '⏎': 'Enter',
  '␣': 'Space',
  '⎋': 'Escape'
};

export default function normalizeKey(key: string): string {
  return MAPPING[key] || key;
}