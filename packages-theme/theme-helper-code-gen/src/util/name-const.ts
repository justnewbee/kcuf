import {
  snakeCase as _snakeCase
} from 'lodash-es';

/**
 * 生成常量名
 */
export default function nameConst(...parts: string[]): string {
  return parts.filter(v => v).map(_snakeCase).join('_').toUpperCase();
}
