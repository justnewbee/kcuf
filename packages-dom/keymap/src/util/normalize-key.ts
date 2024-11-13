import {
  KEY_ALIAS
} from '../const';

/**
 * 将输入规整成 `KeyboardEvent.code`，让配置得以使用 Alias 进行形象化配置
 */
export default function normalizeKey(key: string): string {
  return KEY_ALIAS[key.toUpperCase()] || key;
}
