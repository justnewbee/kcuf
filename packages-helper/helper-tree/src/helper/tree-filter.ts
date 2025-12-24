import {
  ITreeItemBase,
  TTreeItem
} from '../types';

/**
 * 过滤树节点
 *
 * 策略：如果节点本身满足条件，或其任一子孙节点满足条件，则保留该节点及其满足条件的子树，以保留完整的父子路径，适用于搜索等场景
 */
export default function treeFilter<T extends ITreeItemBase>(tree: TTreeItem<T>[], predicate: (node: T) => boolean): TTreeItem<T>[] {
  function doFilter(node: TTreeItem<T>): TTreeItem<T> | null {
    const matched = predicate(node);
    // 递归过滤子节点
    const filteredChildren = node.children?.map(v => doFilter(v)).filter((child): child is TTreeItem<T> => child !== null);
    
    // 如果节点本身满足条件，或者有过滤后的子节点，则保留该节点
    if (matched || filteredChildren?.length) {
      const {
        children: _,
        ...nodeWithoutChildren
      } = node;
      
      return {
        ...nodeWithoutChildren as T,
        ...filteredChildren?.length ? {
          children: filteredChildren
        } : {}
      };
    }
    
    return null; // 否则移除节点
  }
  
  return tree.map(node => doFilter(node)).filter((node): node is TTreeItem<T> => node !== null);
}
