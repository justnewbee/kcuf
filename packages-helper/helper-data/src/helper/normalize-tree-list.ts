import {
  IBaseDataId,
  IBaseDataParentId
} from '../types';

interface IBaseItem extends IBaseDataId, IBaseDataParentId {}

type TTreeItem<T extends IBaseItem> = T & {
  children?: TTreeItem<T>[];
};

/**
 * 将平铺的数据转成树节点列表
 */
export default function normalizeTreeList<T extends IBaseItem>(list: T[]): TTreeItem<T>[] {
  const nodeMap = new Map<string, TTreeItem<T>>();
  const treeList: TTreeItem<T>[] = list.map((v: T) => {
    const treeItem: TTreeItem<T> = { // shallow clone
      ...v
    };
    
    nodeMap.set(treeItem.id, treeItem);
    
    return treeItem;
  });
  
  function putToParent(o: TTreeItem<T>): void {
    if (!o.parentId) {
      return;
    }
    
    const parentNode = nodeMap.get(o.parentId);
    
    if (parentNode) {
      parentNode.children ??= [];
      
      parentNode.children.push(o);
    } else {
      o.parentId = ''; // wrong parent
    }
  }
  
  treeList.forEach(v => putToParent(v));
  
  return treeList.filter(v => !v.parentId); // all top-level nodes
}
