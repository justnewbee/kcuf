import nameCssVar from './name-css-var';
import traverseObject from './traverse-object';

/**
 * 生成代码片段
 *
 * 遍历对象，根据路径生成 CSS var 代码行，用于后续插入到对应的代码块
 */
export default function codeCssVarLines(o: object, prefix?: string): string[] {
  const result: string[] = [];
  
  traverseObject(o, (value: unknown, path: string[]) => result.push(`${nameCssVar(path, prefix)}: ${value};`));
  
  return result;
}
