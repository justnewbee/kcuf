import {
  ITreeItemBase,
  TTreeItem
} from '../types';

export default function treeTraverse<T extends ITreeItemBase>(tree: TTreeItem<T>[], callback: (o: TTreeItem<T>) => void): void {
  function traverse(nodes: TTreeItem<T>[]): void {
    nodes.forEach(v => {
      callback(v);
      
      if (v.children?.length) {
        traverse(v.children);
      }
    });
  }
  
  traverse(tree);
}
