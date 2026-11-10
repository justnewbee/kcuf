export default function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'EmptyError'; // 可能 throw null undefined '' 等
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return (error as Error).toString();
}
