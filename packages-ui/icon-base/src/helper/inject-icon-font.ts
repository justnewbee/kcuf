import {
  IInjectIconFontOptions
} from '../types';
import {
  generateFontFamilyForIcon,
  injectFont
} from '../util';

/**
 * 在 `header` 上注入 IconFont 项目生成的 `@font-face` 全局样式，并返回 font-family 名字
 */
export default function injectIconFont(projectId: string, hash: string, options?: IInjectIconFontOptions): string {
  const fontFamily = generateFontFamilyForIcon(projectId, hash);
  
  return injectFont(fontFamily, options);
}
