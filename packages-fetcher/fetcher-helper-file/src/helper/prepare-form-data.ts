import {
  TFileType
} from '../types';

import makeSureFile from './make-sure-file';

export default async function prepareFormData(file: TFileType, formFieldName = 'file'): Promise<FormData> {
  const formData = new FormData();
  
  formData.append(formFieldName, await makeSureFile(file));
  
  return formData;
}
