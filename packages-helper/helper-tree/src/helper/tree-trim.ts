import {
  ITreeItemBase,
  TTreeItem
} from '../types';

function treeTrimRecursive<T extends ITreeItemBase>(tree: TTreeItem<T>[], maxLevel: number, currentLevel: number): void {
  if (currentLevel >= maxLevel) {
    tree.forEach(node => {
      node.children = null;
      delete node.children;
    });
    
    return;
  }
  
  tree.forEach(node => {
    if (node.children?.length) {
      treeTrimRecursive(node.children, maxLevel, currentLevel + 1);
    }
  });
}

/**
 * 修建树（注意，此方法会直接修改原树）
 */
export default function treeTrim<T extends ITreeItemBase>(tree: TTreeItem<T>[], maxLevel: number): TTreeItem<T>[] {
  if (maxLevel < 1) {
    return tree;
  }
  
  treeTrimRecursive(tree, maxLevel, 1);
  
  return tree;
}
