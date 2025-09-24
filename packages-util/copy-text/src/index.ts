import {
  copyTextNative,
  copyTextLegacy
} from './util';

export default async function copyText(text: string): Promise<boolean> {
  const success = await copyTextNative(text);
  
  return success || copyTextLegacy(text);
}
