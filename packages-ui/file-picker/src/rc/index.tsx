import {
  ReactElement,
  ChangeEvent,
  useRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  IFilePickerProps
} from '../types';
import {
  normalizeFileItems
} from '../util';

const DEFAULT_MAX_SIZE = 100 * 1024 * 1024; // 100M

const ScFilePicker = styled.div`
  display: contents;
`;
/*
 * 之所以 important 是因为某些愚蠢的组件库，会在其 Form 下增加这样的样式（神蠢思维）
 *
 * ```c
 * :where(.css-dev-only-do-not-override-...).form-class-name input[type="file"] { display: block; }
 * ```
 */
const ScInput = styled.input`
  display: none !important;
`;

/**
 * 一个十分纯粹的本地文件选择组件，长什么样由 children 决定，只做选择和判断，不做后续任何逻辑
 */
export default function FilePicker({
  children = 'Select Files',
  accept = '*',
  limit = 1, // 默认单选
  maxSize = DEFAULT_MAX_SIZE,
  disabled,
  onChange
}: IFilePickerProps): ReactElement {
  const refInputFile = useRef<HTMLInputElement>(null);
  
  const handleInputFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    if (!fileList?.length) {
      return;
    }
    
    onChange?.(normalizeFileItems(fileList, accept, maxSize, limit));
    
    // 重置 value，否则重复选同一个文件不触发
    // 👻 注意，不能放在对 fileList 读取完毕之前，否则 Chrome 和 Safari 会连带清空 fileList（Firefox 下不会）
    e.target.value = '';
  }, [accept, limit, maxSize, onChange]);
  
  return <ScFilePicker onClick={disabled ? undefined : () => refInputFile.current?.click()}>
    <ScInput ref={refInputFile} {...{
      type: 'file',
      multiple: limit !== 1,
      accept,
      onChange: handleInputFileChange
    }} />
    {children}
  </ScFilePicker>;
}
