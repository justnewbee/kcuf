import {
  ITreeItemBase,
  TTreeItem
} from '../types';

export default function treeDisableModeDownward<T extends ITreeItemBase>(tree: TTreeItem<T>[], disabledSet: Set<string>): TTreeItem<T>[] {
  function processNode(node: TTreeItem<T>, parentDisabled: boolean): TTreeItem<T> {
    const disabled = parentDisabled || disabledSet.has(node.id);
    const processedChildren = node.children?.map(child => processNode(child, disabled));
    
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
  
  return tree.map(node => processNode(node, false));
}
