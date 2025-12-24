import {
  ITreeItemBase,
  TTreeItem
} from '../types';

export default function treeDisableModeOnly<T extends ITreeItemBase>(tree: TTreeItem<T>[], disabledSet: Set<string>): TTreeItem<T>[] {
  function processNode(node: TTreeItem<T>): TTreeItem<T> {
    const disabled = disabledSet.has(node.id);
    const processedChildren = node.children ? node.children.map(child => processNode(child)) : undefined;
    
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
