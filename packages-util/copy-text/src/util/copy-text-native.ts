export default async function copyTextNative(text: string): Promise<boolean> {
  try { // 无交互纯代码调用，一定报错；有交互后异步调用，有一定的时间容忍度，Firefox 下测试为 4s 可以，5s 不行
    await navigator.clipboard.writeText(text);
    
    return true;
  } catch (_err) { // DOMException: Clipboard write was blocked due to lack of user activation
    return false;
  }
}
