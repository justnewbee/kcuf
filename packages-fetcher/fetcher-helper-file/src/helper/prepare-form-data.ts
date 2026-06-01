import {
  TFileAlike
} from '../types';

import makeSureFile from './make-sure-file';

export default async function prepareFormData(file: TFileAlike, formFieldName = 'file'): Promise<FormData> {
  const formData = new FormData();
  
  formData.append(formFieldName, await makeSureFile(file));
  
  return formData;
}
