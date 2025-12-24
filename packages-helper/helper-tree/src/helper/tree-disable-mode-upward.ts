import {
  ITreeItemBase,
  TTreeItem
} from '../types';

export default function treeDisableModeUpward<T extends ITreeItemBase>(tree: TTreeItem<T>[], disabledSet: Set<string>): TTreeItem<T>[] {
  // 第一步：收集所有需要向上级联禁用的节点路径
  const upwardDisabledSet = new Set(disabledSet);
  
  function collectUpwardDisabled(node: TTreeItem<T>): boolean {
    let hasDisabledChild = disabledSet.has(node.id);
    
    if (node.children) {
      for (const child of node.children) {
        if (collectUpwardDisabled(child)) {
          hasDisabledChild = true;
        }
      }
    }
    
    if (hasDisabledChild) {
      upwardDisabledSet.add(node.id);
    }
    
    return hasDisabledChild;
  }
  
  tree.forEach(node => collectUpwardDisabled(node));
  
  // 第二步：根据收集到的禁用节点集合标记树
  function processNode(node: TTreeItem<T>): TTreeItem<T> {
    const disabled = upwardDisabledSet.has(node.id);
    const processedChildren = node.children?.map(child => processNode(child));
    
    return {
      ...node,
      ...disabled ? {
        disabled: true
      } : {},
      ...processedChildren?.length ? {
        children: processedChildren
      } : {}
    };
  }
  
  return tree.map(node => processNode(node));
}
