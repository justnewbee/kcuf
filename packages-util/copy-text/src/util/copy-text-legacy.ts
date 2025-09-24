import createTextarea from './create-textarea';

export default function copyTextLegacy(text: string): boolean {
  const lastActiveElement = document.activeElement;
  
  const textarea = createTextarea(text);
  let result: boolean;
  
  try {
    textarea.value = text;
    textarea.select();
    
    // 异步操作，可能报错
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    result = document.execCommand('copy');
    
    /**
     * Safari （到版本 15.2 都有）下兼容性问题：
     *
     * 1. select 可以运行，但无法真正选中文字
     * 2. 因此 execCommand 返回 false
     *
     * 解决的办法是用 setSelectionRange 重新选一次
     */
    if (!result) {
      textarea.setSelectionRange(0, text.length);
      
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      result = document.execCommand('copy');
    }
  } catch (_err) { // document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.
    result = false;
  }
  
  textarea.parentNode?.removeChild(textarea);
  
  // 把夺取过来的焦点归还给 lastActiveElement，但不能确定其是否存在或可见，必须 try-catch
  try {
    if (lastActiveElement) {
      (lastActiveElement as HTMLElement).focus();
    }
  } catch (_err) {
    // ignore
  }
  
  return result;
}
