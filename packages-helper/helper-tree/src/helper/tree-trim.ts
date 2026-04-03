import {
  ITreeItemBase,
  TTreeItem
} from '../types';

function treeTrimRecursive<T extends ITreeItemBase>(tree: TTreeItem<T>[], maxDepth: number, currentDepth: number): void {
  if (currentDepth >= maxDepth) {
    tree.forEach(node => {
      node.children = null;
      delete node.children;
    });
    
    return;
  }
  
  tree.forEach(node => {
    if (node.children?.length) {
      treeTrimRecursive(node.children, maxDepth, currentDepth + 1);
    }
  });
}

/**
 * 修建树到最大深度（注意，此方法会直接修改原树）
 */
export default function treeTrim<T extends ITreeItemBase>(tree: TTreeItem<T>[], maxDepth: number): TTreeItem<T>[] {
  if (maxDepth < 1) {
    return tree;
  }
  
  treeTrimRecursive(tree, maxDepth, 0);
  
  return tree;
}
