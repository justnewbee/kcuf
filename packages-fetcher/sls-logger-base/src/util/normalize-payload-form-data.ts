import normalizePayloadFile from './normalize-payload-file';

export default function normalizePayloadFormData(formData: FormData): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  
  formData.forEach((v, k) => {
    const value = v instanceof File ? normalizePayloadFile(v) : v;
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
