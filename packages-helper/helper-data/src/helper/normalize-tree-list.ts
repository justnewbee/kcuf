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
export default function normalizeTreeList<T extends IBaseItem>(list: T[], filter?: (o: T) => boolean): TTreeItem<T>[] {
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
    if (v.parentId && (!filter || filter(v))) {
      putToParent(v);
    }
  });
  
  const treeItems: TTreeItem<T>[] = listClone.filter(v => !v.parentId); // all top-level nodes
  
  return filter ? treeItems.filter(v => { // filter top-level nodes again
    if (v.children?.length) {
      return true;
    }
    
    return filter(v);
  }) : treeItems;
}
