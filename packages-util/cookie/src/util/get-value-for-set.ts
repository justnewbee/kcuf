export default function getValueForSet(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }
  
  switch (typeof value) {
  case 'string':
    return value;
  case 'boolean':
  case 'number':
    return String(value);
  default:
    return JSON.stringify(value); // 不 catch
  }
}
