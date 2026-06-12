import {
  TFileAlike
} from '../types';

import makeSureFile from './make-sure-file';

/**
 * 创建一个 FormData，并填入以 formFieldName 为名（默认值为 file）的 File 对象
 */
export default async function prepareFormData(file: TFileAlike, formFieldName = 'file'): Promise<FormData> {
  const formData = new FormData();
  
  formData.append(formFieldName, await makeSureFile(file));
  
  return formData;
}
