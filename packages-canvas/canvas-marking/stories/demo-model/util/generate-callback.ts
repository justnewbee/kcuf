export default function generateCallback(name: string): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    console.info(name, ...args); // eslint-disable-line no-console
  };
}
