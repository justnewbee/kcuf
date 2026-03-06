export interface IWithChildren<T> {
  children?: IWithChildren<T>[];
}

export interface ITreeItemBase {
  id: string;
  parentId: string;
}

export type TTreeItem<T extends ITreeItemBase> = T & {
  disabled?: boolean;
  children?: TTreeItem<T>[];
};

/**
 * 禁用树节点的模式
 *
 * - only - 仅禁用指定的节点
 * - downward - 向下级联，父节点被禁用，其所有子孙节点也自动标记
 * - upward - 向上级联，当所有子节点被禁用，其所有祖先节点也自动标记
 */
export type TTreeDisableMode = 'only' | 'downward' | 'upward';
