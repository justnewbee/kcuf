import _snakeCase from 'lodash/snakeCase';

/**
 * 生成常量名
 */
export default function nameConst(...parts: string[]): string {
  return parts.filter(v => v).map(_snakeCase).join('_').toUpperCase();
}
