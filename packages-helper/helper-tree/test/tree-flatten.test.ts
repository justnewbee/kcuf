import {
  describe,
  expect,
  test
} from 'vitest';

import {
  TreeItemBase,
  TreeItem,
  treeFlatten
} from '../src';

interface ITestTreeItem extends TreeItemBase {
  name: string;
}

describe('treeFlatten(tree)', () => {
  test('should handle empty tree', () => {
    const result = treeFlatten([]);
    
    expect(result).toEqual([]);
  });
  
  test('should flatten single node without children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '1',
      parentId: '',
      name: 'Root'
    });
    expect(result[0]).not.toHaveProperty('children');
  });
  
  test('should flatten multiple root nodes without children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root 1'
    }, {
      id: '2',
      parentId: '',
      name: 'Root 2'
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe('1');
    expect(result[1]?.id).toBe('2');
  });
  
  test('should flatten tree with one level of children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Parent',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child 1'
      }, {
        id: '3',
        parentId: '1',
        name: 'Child 2'
      }]
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(3);
    expect(result[0]?.id).toBe('1');
    expect(result[1]?.id).toBe('2');
    expect(result[2]?.id).toBe('3');
    
    result.forEach(node => {
      expect(node).not.toHaveProperty('children');
    });
  });
  
  test('should flatten deeply nested tree in depth-first order', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Level 1',
        children: [{
          id: '3',
          parentId: '2',
          name: 'Level 2',
          children: [{
            id: '4',
            parentId: '3',
            name: 'Level 3'
          }]
        }]
      }]
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(4);
    expect(result.map(n => n.id)).toEqual(['1', '2', '3', '4']);
  });
  
  test('should flatten complex multi-branch tree', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Branch A',
        children: [{
          id: '4',
          parentId: '2',
          name: 'A-1'
        }, {
          id: '5',
          parentId: '2',
          name: 'A-2'
        }]
      }, {
        id: '3',
        parentId: '1',
        name: 'Branch B',
        children: [{
          id: '6',
          parentId: '3',
          name: 'B-1'
        }]
      }]
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(6);
    expect(result.map(n => n.id)).toEqual(['1', '2', '4', '5', '3', '6']);
  });
  
  test('should flatten multi-root tree', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root 1',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child 1-1'
      }]
    }, {
      id: '3',
      parentId: '',
      name: 'Root 2',
      children: [{
        id: '4',
        parentId: '3',
        name: 'Child 2-1'
      }]
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(4);
    expect(result.map(n => n.id)).toEqual(['1', '2', '3', '4']);
  });
  
  test('should remove children property even if empty array', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node',
      children: []
    }];
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(1);
    expect(result[0]).not.toHaveProperty('children');
  });
  
  test('should preserve all other properties except children', () => {
    interface IExtendedTreeItem extends TreeItemBase {
      name: string;
      value: number;
      meta?: {
        key: string;
      };
    }
    
    const tree: TreeItem<IExtendedTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      value: 100,
      meta: {
        key: 'test'
      },
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child',
        value: 50
      }]
    }];
    
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: '1',
      parentId: '',
      name: 'Root',
      value: 100,
      meta: {
        key: 'test'
      }
    });
    expect(result[1]).toEqual({
      id: '2',
      parentId: '1',
      name: 'Child',
      value: 50
    });
  });
  
  test('should not mutate original tree', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child'
      }]
    }];
    
    treeFlatten(tree);
    
    expect(tree[0]?.children).toBeDefined();
    expect(tree[0]?.children).toHaveLength(1);
  });
  
  test('should maintain parentId relationships', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child',
        children: [{
          id: '3',
          parentId: '2',
          name: 'Grandchild'
        }]
      }]
    }];
    
    const result = treeFlatten(tree);
    
    expect(result[0]?.parentId).toBe('');
    expect(result[1]?.parentId).toBe('1');
    expect(result[2]?.parentId).toBe('2');
  });
  
  test('should handle nodes with same parent at different levels', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child 1'
      }, {
        id: '3',
        parentId: '1',
        name: 'Child 2'
      }, {
        id: '4',
        parentId: '1',
        name: 'Child 3'
      }]
    }];
    
    const result = treeFlatten(tree);
    
    expect(result).toHaveLength(4);
    expect(result.filter(n => n.parentId === '1')).toHaveLength(3);
  });
});
