import {
  generateFontFamilyForWebfont,
  injectFont
} from '../util';

/**
 * 在 `header` 上注入 IconFont 项目生成的 `@font-face` 全局样式，并返回 font-family 名字
 */
export default function injectWebFont(id: string): string {
  const fontFamily = generateFontFamilyForWebfont(id);
  
  return injectFont(fontFamily);
}
