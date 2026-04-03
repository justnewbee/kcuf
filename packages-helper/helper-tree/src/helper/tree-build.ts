import {
  ITreeItemBase,
  TTreeItem
} from '../types';

import treeFlatten from './tree-flatten';
import treeTrim from './tree-trim';

/**
 * 将平铺的（已标准化 `id` 和 `parentId`）数据转成树节点列表
 */
export default function treeBuild<T extends ITreeItemBase>(list: T[], maxLevel = 0): TTreeItem<T>[] {
  const nodeMap = new Map<string, TTreeItem<T>>();
  const listClone: TTreeItem<T>[] = list.map((v: T) => {
    const treeItem: TTreeItem<T> = { // shallow clone
      ...v
    };
    
    nodeMap.set(treeItem.id, treeItem);
    
    return treeItem;
  });
  
  function putToParent(o: TTreeItem<T>): void {
    const parentNode = nodeMap.get(o.parentId);
    
    if (parentNode) {
      parentNode.children ??= [];
      parentNode.children.push(o);
    } else {
      o.parentId = ''; // wrong parent
    }
  }
  
  listClone.forEach(v => {
    if (v.parentId) {
      putToParent(v);
    }
  });
  
  const tree: TTreeItem<T>[] = listClone.filter(v => !v.parentId); // All top-level nodes
  
  // 若数据有自循环，则自循环的将不会在以上得到的树里
  const flatten = treeFlatten(tree);
  
  if (flatten.length !== list.length) { // 说明有循环，循环的会游离在树之外，需要收回来
    list.forEach(v => {
      if (!flatten.find(vv => vv.id === v.id)) {
        tree.push(v);
      }
    });
  }
  
  return maxLevel > 0 ? treeTrim(tree, maxLevel) : tree;
}
