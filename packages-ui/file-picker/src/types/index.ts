import {
  ReactNode
} from 'react';

import {
  EFileItemError
} from '../enum';

export interface IFileItem {
  id: string; // 唯一标识，可贯穿后续上传流程
  file: File; // 原始 File
  error?: EFileItemError; // 校验未通过的错误
}

export interface IFilePickerProps {
  children?: ReactNode;
  /**
   * 接受的文件类型
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#accept
   */
  accept?: string;
  /**
   * 一次最多能选多少文件
   *
   * - <1 不限制
   * - 0，禁用
   * - 其他，多选
   */
  limit?: number;
  /**
   * 文件大小限制，单位 B
   */
  maxSize?: number;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 选择文件后的回调，返回带校验信息的包裹对象数组（即使 maxFiles 为 1 也是数组）
   *
   * 调用方按 `item.error` 自行处理错误
   */
  onChange?(items: IFileItem[]): void;
}
