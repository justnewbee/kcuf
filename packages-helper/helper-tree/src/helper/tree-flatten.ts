import {
  ITreeItemBase,
  TTreeItem
} from '../types';

import treeTraverse from './tree-traverse';

export default function treeFlatten<T extends ITreeItemBase>(tree: TTreeItem<T>[]): T[] {
  const result: T[] = [];
  
  treeTraverse(tree, v => {
    const {
      children, // 剔除
      ...flatNode
    } = v;
    
    result.push(flatNode as T);
  });
  
  return result;
}
