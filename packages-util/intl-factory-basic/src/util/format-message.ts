import {
  formatText
} from '@kcuf/intl-formmater';

/**
 * 获取替换插值后的原文案
 */
export default function formatMessage<O, V = void>(messages: O, id: keyof O, values?: V, escapeValues?: boolean): string {
  const text = (messages[id] || id || '') as string;
  
  if (!values) {
    return text as string;
  }
  
  // 如果文案当中有类似 `{xx}` 的地方需要将其用 `values.xx` 来替换
  return formatText(text, values, escapeValues);
}
