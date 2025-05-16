/**
 * 替换插值，将 `{xx}` 的地方用 `values.xx` 替换
 */
export default function formatText<V extends object>(text: string, values?: V, escapeValues?: boolean): string {
  return text.replace(/\\?{([^}]+)}/g, (match: string, k: string) => {
    if (match.charAt(0) === '\\') {
      return match.slice(1);
    }
    
    const value = (values as Record<string, unknown>)[k];
    
    if (value === undefined) {
      return '';
    }
    
    if (typeof value === 'string' && escapeValues) {
      return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    
    return String(value);
  });
}
