import {
  describe,
  expect,
  test
} from 'vitest';

import {
  TreeItemBase,
  TreeItem,
  treeFilter
} from '../src';

interface ITestTreeItem extends TreeItemBase {
  name: string;
}

describe('treeFilter(tree, predicate)', () => {
  test('should handle empty tree', () => {
    expect(treeFilter([], () => true)).toEqual([]);
    expect(treeFilter([], () => false)).toEqual([]);
  });
  
  test('should keep single node that matches predicate', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Match'
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
  });
  
  test('should remove single node that does not match predicate', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'NoMatch'
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toEqual([]);
  });
  
  test('should keep parent node when child matches (preserve path)', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Parent',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Match'
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
    expect(result[0]?.name).toBe('Parent');
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.name).toBe('Match');
  });
  
  test('should filter out non-matching children', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Parent',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Match'
      }, {
        id: '3',
        parentId: '1',
        name: 'NoMatch'
      }, {
        id: '4',
        parentId: '1',
        name: 'Match'
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.children).toHaveLength(2);
    expect(result[0]?.children?.[0]?.id).toBe('2');
    expect(result[0]?.children?.[1]?.id).toBe('4');
  });
  
  test('should preserve path for deeply nested matching node', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Level1',
        children: [{
          id: '3',
          parentId: '2',
          name: 'Level2',
          children: [{
            id: '4',
            parentId: '3',
            name: 'Match'
          }]
        }]
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
    expect(result[0]?.children?.[0]?.id).toBe('2');
    expect(result[0]?.children?.[0]?.children?.[0]?.id).toBe('3');
    expect(result[0]?.children?.[0]?.children?.[0]?.children?.[0]?.id).toBe('4');
  });
  
  test('should filter multi-root tree', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root1',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Match'
      }]
    }, {
      id: '3',
      parentId: '',
      name: 'Root2',
      children: [{
        id: '4',
        parentId: '3',
        name: 'NoMatch'
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
  });
  
  test('should return empty array when no nodes match', () => {
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
    const result = treeFilter(tree, node => node.name === 'NoMatch');
    
    expect(result).toEqual([]);
  });
  
  test('should keep all nodes when all match', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Node1',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Node2'
      }, {
        id: '3',
        parentId: '1',
        name: 'Node3'
      }]
    }];
    const result = treeFilter(tree, () => true);
    
    expect(result).toHaveLength(1);
    expect(result[0]?.children).toHaveLength(2);
  });
  
  test('should filter complex tree with multiple branches', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'BranchA',
        children: [{
          id: '4',
          parentId: '2',
          name: 'Match'
        }, {
          id: '5',
          parentId: '2',
          name: 'NoMatch'
        }]
      }, {
        id: '3',
        parentId: '1',
        name: 'BranchB',
        children: [{
          id: '6',
          parentId: '3',
          name: 'NoMatch'
        }]
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.id).toBe('2');
    expect(result[0]?.children?.[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.children?.[0]?.id).toBe('4');
  });
  
  test('should remove children property when no children remain', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Match',
      children: [{
        id: '2',
        parentId: '1',
        name: 'NoMatch'
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('1');
    expect(result[0]?.children).toBeUndefined();
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
    const originalChildrenLength = tree[0]?.children?.length ?? 0;
    
    treeFilter(tree, node => node.name === 'Root');
    
    expect(tree[0]?.children).toHaveLength(originalChildrenLength);
  });
  
  test('should preserve all node properties', () => {
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
      name: 'Match',
      value: 100,
      meta: {
        key: 'test'
      }
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result[0]).toEqual({
      id: '1',
      parentId: '',
      name: 'Match',
      value: 100,
      meta: {
        key: 'test'
      }
    });
  });
  
  test('should filter based on id', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Child1'
      }, {
        id: '3',
        parentId: '1',
        name: 'Child2'
      }]
    }];
    const result = treeFilter(tree, node => node.id === '2');
    
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.id).toBe('2');
  });
  
  test('should handle multiple matching paths', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        name: 'Branch1',
        children: [{
          id: '4',
          parentId: '2',
          name: 'Match'
        }]
      }, {
        id: '3',
        parentId: '1',
        name: 'Branch2',
        children: [{
          id: '5',
          parentId: '3',
          name: 'Match'
        }]
      }]
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.children).toHaveLength(2);
    expect(result[0]?.children?.[0]?.children?.[0]?.name).toBe('Match');
    expect(result[0]?.children?.[1]?.children?.[0]?.name).toBe('Match');
  });
  
  test('should filter with complex predicate', () => {
    interface IValueTreeItem extends TreeItemBase {
      name: string;
      value: number;
    }
    
    const tree: TreeItem<IValueTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      value: 50,
      children: [{
        id: '2',
        parentId: '1',
        name: 'High',
        value: 100
      }, {
        id: '3',
        parentId: '1',
        name: 'Low',
        value: 10
      }]
    }];
    const result = treeFilter(tree, node => node.value >= 50);
    
    expect(result).toHaveLength(1);
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.name).toBe('High');
  });
  
  test('should handle nodes with empty children array', () => {
    const tree: TreeItem<ITestTreeItem>[] = [{
      id: '1',
      parentId: '',
      name: 'Match',
      children: []
    }];
    const result = treeFilter(tree, node => node.name === 'Match');
    
    expect(result).toHaveLength(1);
    expect(result[0]?.children).toBeUndefined();
  });
});
