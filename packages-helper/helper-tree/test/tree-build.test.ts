import {
  describe,
  expect,
  test
} from 'vitest';

import {
  TreeItemBase,
  treeBuild
} from '../src';

interface ITestTreeItem extends TreeItemBase {
  name: string;
}

describe('treeBuild(list)', () => {
  test('should handle empty list', () => {
    const result = treeBuild([]);
    
    expect(result).toEqual([]);
  });
  
  test('should build tree from flat list with single root', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Child 1'
    }, {
      id: '3',
      parentId: '1',
      name: 'Child 2'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(1);
    expect(tree[0]?.id).toBe('1');
    expect(tree[0]?.children).toHaveLength(2);
    expect(tree[0]?.children?.[0]?.id).toBe('2');
    expect(tree[0]?.children?.[1]?.id).toBe('3');
  });
  
  test('should build tree with multiple root nodes', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root 1'
    }, {
      id: '2',
      parentId: '',
      name: 'Root 2'
    }, {
      id: '3',
      parentId: '1',
      name: 'Child of Root 1'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(2);
    expect(tree[0]?.id).toBe('1');
    expect(tree[1]?.id).toBe('2');
    expect(tree[0]?.children).toHaveLength(1);
    expect(tree[1]?.children).toBeUndefined();
  });
  
  test('should build deeply nested tree', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Level 1'
    }, {
      id: '3',
      parentId: '2',
      name: 'Level 2'
    }, {
      id: '4',
      parentId: '3',
      name: 'Level 3'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(1);
    expect(tree[0]?.id).toBe('1');
    expect(tree[0]?.children?.[0]?.id).toBe('2');
    expect(tree[0]?.children?.[0]?.children?.[0]?.id).toBe('3');
    expect(tree[0]?.children?.[0]?.children?.[0]?.children?.[0]?.id).toBe('4');
  });
  
  test('should handle nodes with non-existent parent (orphaned nodes)', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: 'non-existent',
      name: 'Orphan'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(2);
    expect(tree[0]?.id).toBe('1');
    expect(tree[1]?.id).toBe('2');
    expect(tree[1]?.parentId).toBe(''); // parentId is reset to ''
  });
  
  test('should not mutate original list items', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Child'
    }];
    const originalChild = list[1];
    
    treeBuild(list);
    
    expect(originalChild).not.toHaveProperty('children');
  });
  
  test('should build complex tree with multiple branches', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Branch A'
    }, {
      id: '3',
      parentId: '1',
      name: 'Branch B'
    }, {
      id: '4',
      parentId: '2',
      name: 'A-1'
    }, {
      id: '5',
      parentId: '2',
      name: 'A-2'
    }, {
      id: '6',
      parentId: '3',
      name: 'B-1'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(1);
    expect(tree[0]?.children).toHaveLength(2);
    expect(tree[0]?.children?.[0]?.children).toHaveLength(2);
    expect(tree[0]?.children?.[1]?.children).toHaveLength(1);
  });
  
  test('should handle circular reference (self-loop)', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Child'
    }, {
      id: '3',
      parentId: '3',
      name: 'Self Loop'
    }];
    const tree = treeBuild(list);

    expect(tree).toHaveLength(2);
    expect(tree[0]?.id).toBe('1');
    expect(tree[0]?.children).toHaveLength(1);
    expect(tree[0]?.children?.[0]?.id).toBe('2');
    expect(tree[1]?.id).toBe('3');
    expect(tree[1]?.parentId).toBe('3');
  });

  test('should handle circular reference (mutual loop)', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '3',
      name: 'Node A'
    }, {
      id: '3',
      parentId: '2',
      name: 'Node B'
    }];
    const tree = treeBuild(list);

    expect(tree).toHaveLength(3);
    expect(tree[0]?.id).toBe('1');
    expect(tree[1]?.id).toBe('2');
    expect(tree[2]?.id).toBe('3');
  });

  test('should handle circular reference in complex tree', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root'
    }, {
      id: '2',
      parentId: '1',
      name: 'Normal Child'
    }, {
      id: '3',
      parentId: '4',
      name: 'Loop A'
    }, {
      id: '4',
      parentId: '3',
      name: 'Loop B'
    }];
    const tree = treeBuild(list);

    expect(tree).toHaveLength(3);
    expect(tree[0]?.id).toBe('1');
    expect(tree[0]?.children).toHaveLength(1);
    expect(tree[0]?.children?.[0]?.id).toBe('2');
    expect(tree[1]?.id).toBe('3');
    expect(tree[2]?.id).toBe('4');
  });

  test('should handle nodes with only root nodes', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root 1'
    }, {
      id: '2',
      parentId: '',
      name: 'Root 2'
    }, {
      id: '3',
      parentId: '',
      name: 'Root 3'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(3);
    expect(tree[0]?.children).toBeUndefined();
    expect(tree[1]?.children).toBeUndefined();
    expect(tree[2]?.children).toBeUndefined();
  });
  
  test('should handle all nodes being children (no roots)', () => {
    const list: ITestTreeItem[] = [{
      id: '1',
      parentId: 'non-existent',
      name: 'Child 1'
    }, {
      id: '2',
      parentId: 'non-existent',
      name: 'Child 2'
    }];
    const tree = treeBuild(list);
    
    expect(tree).toHaveLength(2);
    expect(tree[0]?.parentId).toBe('');
    expect(tree[1]?.parentId).toBe('');
  });
  
  test('should preserve all properties of nodes', () => {
    interface IExtendedTreeItem extends TreeItemBase {
      name: string;
      value: number;
      meta?: {
        key: string;
      };
    }
    
    const list: IExtendedTreeItem[] = [{
      id: '1',
      parentId: '',
      name: 'Root',
      value: 100,
      meta: {
        key: 'test'
      }
    }, {
      id: '2',
      parentId: '1',
      name: 'Child',
      value: 50
    }];
    const tree = treeBuild(list);
    
    expect(tree[0]?.name).toBe('Root');
    expect(tree[0]?.value).toBe(100);
    expect(tree[0]?.meta).toEqual({
      key: 'test'
    });
    expect(tree[0]?.children?.[0]?.value).toBe(50);
  });
});
