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
const ScInput = styled.input`
  display: none;
`;

/**
 * 一个十分纯粹的本地文件选择组件，长什么样由 children 决定，只做选择和判断，不做后续任何逻辑
 */
export default function FilePicker({
  children = 'Select Files',
  accept = '*',
  limit = 1, // 默认单选
  maxSize = DEFAULT_MAX_SIZE,
  onChange
}: IFilePickerProps): ReactElement {
  const refInputFile = useRef<HTMLInputElement>(null);
  const multiple = limit !== 1;
  
  const handleInputFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    e.target.value = ''; // 重置 value，否则重复选同一个文件不触发
    
    if (!fileList?.length) {
      return;
    }
    
    onChange?.(normalizeFileItems(fileList, accept, maxSize, limit));
  }, [accept, limit, maxSize, onChange]);
  
  return <ScFilePicker onClick={() => refInputFile.current?.click()}>
    <ScInput ref={refInputFile} {...{
      type: 'file',
      multiple,
      accept,
      onChange: handleInputFileChange
    }} />
    {children}
  </ScFilePicker>;
}
