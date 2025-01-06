export default function splitClassNames(className: string): string[] {
  return className.split(/\s+/).filter(v => v);
}
