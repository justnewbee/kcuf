import normalizeFile from './normalize-file';

export default function normalizeFormData(formData: FormData): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  
  formData.forEach((v, k) => {
    const value = v instanceof File ? normalizeFile(v) : v;
    const exist = normalized[k];
    
    if (Array.isArray(exist)) {
      exist.push(value);
    } else if (exist) {
      normalized[k] = [exist, value];
    } else {
      normalized[k] = value;
    }
  });
  
  return normalized;
}