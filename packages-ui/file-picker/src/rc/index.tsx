import {
  ReactElement,
  ChangeEvent,
  useRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  uuid
} from '@kcuf/helper-data';
import {
  checkFileType
} from '@kcuf/fetcher-helper-file';

import {
  EFileItemError
} from '../enum';
import {
  IFilePickerProps,
  IFileItem
} from '../types';

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
  onPickFiles
}: IFilePickerProps): ReactElement {
  const refInputFile = useRef<HTMLInputElement>(null);
  const multiple = limit !== 1;
  
  const handleInputFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    e.target.value = ''; // 关键：重置 value，否则重复选同一个文件不触发
    
    if (!fileList?.length) {
      return;
    }
    
    let count = 0;
    const items: IFileItem[] = Array.from(fileList).map((file: File): IFileItem => {
      let error: EFileItemError | undefined;
      
      if (limit >= 1 && count >= limit) {
        error = EFileItemError.EXCEED_LIMIT;
      } else if (!checkFileType(file, accept)) {
        error = EFileItemError.ACCEPT_MISMATCH;
      } else if (maxSize > 0 && file.size > maxSize) {
        error = EFileItemError.EXCEED_MAX_SIZE;
      }
      
      if (!error) {
        count += 1;
      }
      
      return {
        id: uuid(),
        file,
        error
      };
    });
    
    onPickFiles?.(items);
  }, [accept, limit, maxSize, onPickFiles]);
  
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
