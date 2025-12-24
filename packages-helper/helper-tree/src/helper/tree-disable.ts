import {
  ITreeItemBase,
  TTreeItem,
  TTreeDisableMode
} from '../types';

import treeDisableModeOnly from './tree-disable-mode-only';
import treeDisableModeDownward from './tree-disable-mode-downward';
import treeDisableModeUpward from './tree-disable-mode-upward';

/**
 * 禁用树节点
 */
export default function treeDisable<T extends ITreeItemBase>(tree: TTreeItem<T>[], disabledIds: string[], mode?: TTreeDisableMode): TTreeItem<T>[] {
  const disabledSet = new Set(disabledIds);
  
  switch (mode) {
  case 'downward':
    return treeDisableModeDownward(tree, disabledSet);
  case 'upward':
    return treeDisableModeUpward(tree, disabledSet);
  default:
    return treeDisableModeOnly(tree, disabledSet);
  }
}
