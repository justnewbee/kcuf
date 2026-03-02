import {
  ITreeItemBase,
  TTreeItem
} from '../types';

/**
 * 转换树节点
 */
export default function treeMap<T extends ITreeItemBase, T0 extends ITreeItemBase = ITreeItemBase>(tree: TTreeItem<T0>[], mapper: (node: T0) => T): TTreeItem<T>[] {
  function mapNode(node: TTreeItem<T0>): TTreeItem<T> {
    const newNode = mapper(node) as TTreeItem<T>;
    
    if ('disabled' in node) {
      newNode.disabled = node.disabled;
    }
    
    if (node.children) {
      newNode.children = node.children.map(mapNode);
    }
    
    return newNode;
  }
  
  return tree.map(mapNode);
}
