import {
  describe,
  expect,
  test
} from 'vitest';

import {
  TreeItemBase,
  TreeItem,
  treeDisable
} from '../src';

interface ITestTreeItem extends TreeItemBase {
  name: string;
}

describe('treeDisable(tree, disabledIds, mode)', () => {
  describe('mode: only (default)', () => {
    test('should handle empty tree', () => {
      const result = treeDisable([], []);

      expect(result).toEqual([]);
    });

    test('should handle empty disabledIds', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root'
      }];
      const result = treeDisable(tree, []);

      expect(result).toHaveLength(1);
      expect(result[0]?.disabled).toBeUndefined();
    });

    test('should disable single node', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root'
      }];
      const result = treeDisable(tree, ['1']);

      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('1');
      expect(result[0]?.disabled).toBe(true);
    });

    test('should disable node without affecting siblings', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Node1'
      }, {
        id: '2',
        parentId: '',
        name: 'Node2'
      }, {
        id: '3',
        parentId: '',
        name: 'Node3'
      }];
      const result = treeDisable(tree, ['2']);

      expect(result).toHaveLength(3);
      expect(result[0]?.disabled).toBeUndefined();
      expect(result[1]?.disabled).toBe(true);
      expect(result[2]?.disabled).toBeUndefined();
    });
    
    test('should only disable specified node, not children', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
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
      const result = treeDisable(tree, ['1']);

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.disabled).toBeUndefined();
    });

    test('should not cascade to deeply nested children', () => {
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
              name: 'Level3'
            }]
          }]
        }]
      }];
      const result = treeDisable(tree, ['1']);

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.children?.[0]?.children?.[0]?.disabled).toBeUndefined();
    });

    test('should disable specific child without affecting parent or siblings', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
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
      const result = treeDisable(tree, ['2']);

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBeUndefined();
    });

    test('should disable child without affecting its descendants', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root',
        children: [{
          id: '2',
          parentId: '1',
          name: 'Parent',
          children: [{
            id: '3',
            parentId: '2',
            name: 'Child'
          }]
        }]
      }];
      const result = treeDisable(tree, ['2']);

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBeUndefined();
    });
    
    test('should disable multiple specific nodes only', () => {
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
          name: 'Child2',
          children: [{
            id: '4',
            parentId: '3',
            name: 'Grandchild'
          }]
        }]
      }];
      const result = treeDisable(tree, ['2', '4']);

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.children?.[0]?.disabled).toBe(true);
    });
    
    test('should handle non-existent IDs gracefully', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root'
      }];
      const result = treeDisable(tree, ['non-existent', '999']);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.disabled).toBeUndefined();
    });
    
    test('should disable specific nodes in multi-root tree', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root1',
        children: [{
          id: '2',
          parentId: '1',
          name: 'Child1'
        }]
      }, {
        id: '3',
        parentId: '',
        name: 'Root2',
        children: [{
          id: '4',
          parentId: '3',
          name: 'Child2'
        }]
      }];
      const result = treeDisable(tree, ['1', '4']);

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[1]?.disabled).toBeUndefined();
      expect(result[1]?.children?.[0]?.disabled).toBe(true);
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
      
      treeDisable(tree, ['1']);
      
      expect(tree[0]).not.toHaveProperty('disabled');
      expect(tree[0]?.children?.[0]).not.toHaveProperty('disabled');
    });
    
    test('should preserve all original properties', () => {
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
        }
      }];
      const result = treeDisable(tree, ['1']);
      
      expect(result[0]).toMatchObject({
        id: '1',
        parentId: '',
        name: 'Root',
        value: 100,
        meta: {
          key: 'test'
        },
        disabled: true
      });
    });
    
    test('should disable only specific branch node', () => {
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
            name: 'A-1'
          }, {
            id: '5',
            parentId: '2',
            name: 'A-2'
          }]
        }, {
          id: '3',
          parentId: '1',
          name: 'BranchB',
          children: [{
            id: '6',
            parentId: '3',
            name: 'B-1'
          }]
        }]
      }];
      const result = treeDisable(tree, ['2']);

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.children?.[1]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.children?.[0]?.disabled).toBeUndefined();
    });

    test('should handle multiple IDs at different levels', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
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
      const result = treeDisable(tree, ['1', '3']);

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
    });
    
    test('should handle duplicate IDs in disabledIds', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root'
      }];
      const result = treeDisable(tree, ['1', '1', '1']);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.disabled).toBe(true);
    });
    
    test('should preserve children array when parent is disabled', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
        children: [{
          id: '2',
          parentId: '1',
          name: 'Child'
        }]
      }];
      const result = treeDisable(tree, ['1']);
      
      expect(result[0]?.children).toBeDefined();
      expect(result[0]?.children).toHaveLength(1);
    });
    
    test('should handle nodes with no children', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Leaf1'
      }, {
        id: '2',
        parentId: '',
        name: 'Leaf2'
      }];
      const result = treeDisable(tree, ['1']);
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[1]?.disabled).toBeUndefined();
      expect(result[0]?.children).toBeUndefined();
    });
  });

  describe('mode: downward', () => {
    test('should cascade disable to all children when parent is disabled', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
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
      const result = treeDisable(tree, ['1'], 'downward');

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBe(true);
    });

    test('should cascade disable to deeply nested children', () => {
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
              name: 'Level3'
            }]
          }]
        }]
      }];
      const result = treeDisable(tree, ['1'], 'downward');

      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
    });

    test('should disable child and cascade to its descendants', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root',
        children: [{
          id: '2',
          parentId: '1',
          name: 'Parent',
          children: [{
            id: '3',
            parentId: '2',
            name: 'Child'
          }]
        }]
      }];
      const result = treeDisable(tree, ['2'], 'downward');

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
    });

    test('should cascade to all descendants from multiple disabled nodes', () => {
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
          name: 'Child2',
          children: [{
            id: '4',
            parentId: '3',
            name: 'Grandchild'
          }]
        }]
      }];
      const result = treeDisable(tree, ['2', '3'], 'downward');

      expect(result[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.children?.[0]?.disabled).toBe(true);
    });
  });

  describe('mode: upward', () => {
    test('should cascade disable to parent', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Parent',
        children: [{
          id: '2',
          parentId: '1',
          name: 'Child'
        }]
      }];
      const result = treeDisable(tree, ['2'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
    });
    
    test('should cascade disable to all ancestors', () => {
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
              name: 'Level3'
            }]
          }]
        }]
      }];
      const result = treeDisable(tree, ['4'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
    });
    
    test('should not disable siblings of disabled node', () => {
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
            name: 'Target'
          }]
        }, {
          id: '3',
          parentId: '1',
          name: 'Branch2',
          children: [{
            id: '5',
            parentId: '3',
            name: 'Sibling'
          }]
        }]
      }];
      const result = treeDisable(tree, ['4'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.children?.[0]?.disabled).toBeUndefined();
    });
    
    test('should disable parent when any child is disabled', () => {
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
        }, {
          id: '4',
          parentId: '1',
          name: 'Child3'
        }]
      }];
      const result = treeDisable(tree, ['3'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBeUndefined();
      expect(result[0]?.children?.[1]?.disabled).toBe(true);
      expect(result[0]?.children?.[2]?.disabled).toBeUndefined();
    });
    
    test('should handle multiple disabled nodes in different branches', () => {
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
            name: 'Target1'
          }]
        }, {
          id: '3',
          parentId: '1',
          name: 'Branch2',
          children: [{
            id: '5',
            parentId: '3',
            name: 'Target2'
          }]
        }]
      }];
      const result = treeDisable(tree, ['4', '5'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[0]?.children?.[0]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.disabled).toBe(true);
      expect(result[0]?.children?.[1]?.children?.[0]?.disabled).toBe(true);
    });
    
    test('should not cascade upward from root nodes', () => {
      const tree: TreeItem<ITestTreeItem>[] = [{
        id: '1',
        parentId: '',
        name: 'Root1'
      }, {
        id: '2',
        parentId: '',
        name: 'Root2'
      }];
      const result = treeDisable(tree, ['1'], 'upward');
      
      expect(result[0]?.disabled).toBe(true);
      expect(result[1]?.disabled).toBeUndefined();
    });
  });
});
