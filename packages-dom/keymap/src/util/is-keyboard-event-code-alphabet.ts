export default function isKeyboardEventCodeAlphabet(e: KeyboardEvent): boolean {
  return /Key[A-Z]/.test(e.code);
}