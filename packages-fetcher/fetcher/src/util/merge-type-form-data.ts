export default function mergeTypeFormData(formData1: FormData, formData2: FormData): FormData {
  formData2.forEach((v, k) => {
    formData1.append(k, v); // 不用 set
  });
  
  return formData1;
}