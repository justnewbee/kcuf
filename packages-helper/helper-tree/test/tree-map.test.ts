import {
  describe,
  expect,
  test
} from 'vitest';

import {
  TreeItem,
  TreeItemBase,
  treeMap
} from '../src';

interface ISourceItem extends TreeItemBase {
  label: string;
}

interface ITargetItem extends TreeItemBase {
  name: string;
}

describe('treeMap(tree, mapper)', () => {
  test('should handle empty tree', () => {
    expect(treeMap<ITargetItem, ISourceItem>([], node => ({
      ...node,
      name: node.label
    }))).toEqual([]);
  });
  
  test('should map a single node', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root'
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '1',
      parentId: '',
      name: 'Root'
    });
  });
  
  test('should remove source-specific fields not included in mapper output', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root'
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect((result[0] as unknown as ISourceItem).label).toBeUndefined();
  });
  
  test('should recursively map children', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        label: 'Child'
      }]
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.name).toBe('Child');
    expect(result[0]?.children?.[0]?.id).toBe('2');
  });
  
  test('should map deeply nested tree', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'L0',
      children: [{
        id: '2',
        parentId: '1',
        label: 'L1',
        children: [{
          id: '3',
          parentId: '2',
          label: 'L2'
        }]
      }]
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result[0]?.name).toBe('L0');
    expect(result[0]?.children?.[0]?.name).toBe('L1');
    expect(result[0]?.children?.[0]?.children?.[0]?.name).toBe('L2');
  });
  
  test('should preserve disabled property', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root',
      disabled: true,
      children: [{
        id: '2',
        parentId: '1',
        label: 'Child',
        disabled: false
      }]
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result[0]?.disabled).toBe(true);
    expect(result[0]?.children?.[0]?.disabled).toBe(false);
  });
  
  test('should not add disabled property when source node has none', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root'
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect('disabled' in result[0]!).toBe(false); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  });
  
  test('should not add children property when source node has no children', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root'
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result[0]?.children).toBeUndefined();
  });
  
  test('should not add children property when source has empty children array', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root',
      children: []
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result[0]?.children).toEqual([]);
  });
  
  test('should map multi-root tree', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root1'
    }, {
      id: '2',
      parentId: '',
      label: 'Root2'
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe('Root1');
    expect(result[1]?.name).toBe('Root2');
  });
  
  test('should not mutate the original tree', () => {
    const child: TreeItem<ISourceItem> = {
      id: '2',
      parentId: '1',
      label: 'Child'
    };
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root',
      children: [child]
    }];
    
    treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label
    }));
    
    expect(tree[0]?.label).toBe('Root');
    expect(tree[0]?.children?.[0]).toBe(child);
  });
  
  test('should support mapper that transforms field values', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'hello',
      children: [{
        id: '2',
        parentId: '1',
        label: 'world'
      }]
    }];
    const result = treeMap<ITargetItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label.toUpperCase()
    }));
    
    expect(result[0]?.name).toBe('HELLO');
    expect(result[0]?.children?.[0]?.name).toBe('WORLD');
  });
  
  test('should support mapping to the same type (identity-like)', () => {
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'Root',
      children: [{
        id: '2',
        parentId: '1',
        label: 'Child'
      }]
    }];
    const result = treeMap<ISourceItem, ISourceItem>(tree, node => ({
      ...node
    }));
    
    expect(result[0]?.label).toBe('Root');
    expect(result[0]?.children?.[0]?.label).toBe('Child');
  });
  
  test('should support mapper that adds extra fields to target', () => {
    interface IRichItem extends TreeItemBase {
      name: string;
      upper: string;
    }
    
    const tree: TreeItem<ISourceItem>[] = [{
      id: '1',
      parentId: '',
      label: 'root'
    }];
    const result = treeMap<IRichItem, ISourceItem>(tree, node => ({
      id: node.id,
      parentId: node.parentId,
      name: node.label,
      upper: node.label.toUpperCase()
    }));
    
    expect(result[0]?.name).toBe('root');
    expect(result[0]?.upper).toBe('ROOT');
  });
});
