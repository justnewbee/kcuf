export interface ICodemirrorProps {
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  /**
   * 目前支持的语言如下（大小写无关）
   *
   * - json / json5
   * - javascript / typescript / js / jsx / ts / tsx
   * - css / less / sass
   * - html / htm
   * - markdown / md
   * - python
   *
   * TODO 需要支持扩展
   */
  language?: string;
  theme?: 'none' | 'one-dark' | 'material-dark' | 'material-light'; // default material-dark
  lines?: number | [number, number];
  onChange?(value: string): void;
}
