import {
  describe,
  expect,
  test,
  vi
} from 'vitest';

import {
  TreeItemBase,
  TreeItem,
  treeTraverse
} from '../src';

interface ITestTreeItem extends TreeItemBase {
  name: string;
}

describe('treeTraverse(tree, callback)', () => {
  test('should handle empty tree array', () => {
    const callback = vi.fn();
    
    treeTraverse([], callback);
    
    expect(callback).not.toHaveBeenCalled();
  });
  
  test('should traverse single node without children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node 1'
    }];
    const callback = vi.fn();
    
    treeTraverse(tree, callback);
    
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(tree[0]);
  });
  
  test('should traverse multiple nodes without children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node 1'
    }, {
      id: '2',
      parentId: '',
      name: 'Node 2'
    }, {
      id: '3',
      parentId: '',
      name: 'Node 3'
    }];
    const callback = vi.fn();
    
    treeTraverse(tree, callback);
    
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, tree[0]);
    expect(callback).toHaveBeenNthCalledWith(2, tree[1]);
    expect(callback).toHaveBeenNthCalledWith(3, tree[2]);
  });
  
  test('should traverse tree with one level of children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Parent',
      children: [{
        id: '1-1',
        parentId: '1',
        name: 'Child 1'
      }, {
        id: '1-2',
        parentId: '1',
        name: 'Child 2'
      }]
    }];
    const callback = vi.fn();
    
    treeTraverse(tree, callback);
    
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, tree[0]);
    expect(callback).toHaveBeenNthCalledWith(2, tree[0]?.children?.[0]);
    expect(callback).toHaveBeenNthCalledWith(3, tree[0]?.children?.[1]);
  });
  
  test('should traverse deeply nested tree (depth-first)', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '1-1',
        parentId: '1',
        name: 'Child 1',
        children: [{
          id: '1-1-1',
          parentId: '1-1',
          name: 'Grandchild 1'
        }]
      }, {
        id: '1-2',
        parentId: '1',
        name: 'Child 2'
      }]
    }];
    const visitedIds: string[] = [];
    
    treeTraverse(tree, (node: TreeItem<ITestTreeItem>) => {
      visitedIds.push(node.id);
    });
    
    expect(visitedIds).toEqual(['1', '1-1', '1-1-1', '1-2']);
  });
  
  test('should traverse complex multi-root tree', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root 1',
      children: [{
        id: '1-1',
        parentId: '1',
        name: 'Child 1-1'
      }, {
        id: '1-2',
        parentId: '1',
        name: 'Child 1-2',
        children: [{
          id: '1-2-1',
          parentId: '1-2',
          name: 'Grandchild 1-2-1'
        }]
      }]
    }, {
      id: '2',
      parentId: '',
      name: 'Root 2',
      children: [{
        id: '2-1',
        parentId: '2',
        name: 'Child 2-1'
      }]
    }];
    
    const visitedIds: string[] = [];
    
    treeTraverse(tree, (node: TreeItem<ITestTreeItem>) => {
      visitedIds.push(node.id);
    });
    
    expect(visitedIds).toEqual(['1', '1-1', '1-2', '1-2-1', '2', '2-1']);
  });
  
  test('should handle nodes with empty children array', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node with empty children',
      children: []
    }];
    const callback = vi.fn();
    
    treeTraverse(tree, callback);
    
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(tree[0]);
  });
  
  test('should allow callback to mutate nodes', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node 1',
      children: [{
        id: '1-1',
        parentId: '1',
        name: 'Child 1'
      }]
    }];
    
    treeTraverse(tree, (node: TreeItem<ITestTreeItem>) => {
      node.name = node.name.toUpperCase();
    });
    
    expect(tree[0]?.name).toBe('NODE 1');
    expect(tree[0]?.children?.[0]?.name).toBe('CHILD 1');
  });
  
  test('should pass correct node reference to callback', () => {
    const child = {
      id: '1-1',
      parentId: '1',
      name: 'Child'
    };
    const parent: TreeItem<ITestTreeItem> = {
      id: '1',
      parentId: '',
      name: 'Parent',
      children: [child]
    };
    const tree = [parent];
    const callback = vi.fn();
    
    treeTraverse(tree, callback);
    
    expect(callback).toHaveBeenCalledWith(parent);
    expect(callback).toHaveBeenCalledWith(child);
  });
});
