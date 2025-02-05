import {
  getContrast,
  meetsContrastGuidelines
} from 'polished';
import {
  getContrastGuidelines
} from '@kcuf/mere-color';

export default function getContrastLabel(color: string, dark?: boolean): string | number {
  const againstColor = dark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)';
  const contrast = getContrast(color, againstColor);
  const contrastGuidelines = meetsContrastGuidelines(color, againstColor);
  let guidLineLevel = '';
  
  const d = getContrastGuidelines(color, againstColor);
  
  if (contrastGuidelines.AAA) {
    guidLineLevel = 'AAA';
  } else if (contrastGuidelines.AA) {
    guidLineLevel = 'AA';
  } else if (contrastGuidelines.AAALarge) {
    guidLineLevel = 'AAALarge';
  } else if (contrastGuidelines.AALarge) {
    guidLineLevel = 'AALarge';
  }
  
  console.info(color, contrast === d.contrast, color, contrast, d.contrast); // TODO 有不一样的
  
  return guidLineLevel ? `${contrast} / ${guidLineLevel} | ${d.contrast}` : contrast;
}
