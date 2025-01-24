import {
  getContrast,
  meetsContrastGuidelines
} from 'polished';

export default function getContrastLabel(color: string, dark?: boolean): string | number {
  const againstColor = dark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)';
  const contrast = getContrast(color, againstColor);
  const contrastGuidelines = meetsContrastGuidelines(color, againstColor);
  let guidLineLevel = '';
  
  if (contrastGuidelines.AAA) {
    guidLineLevel = 'AAA';
  } else if (contrastGuidelines.AA) {
    guidLineLevel = 'AA';
  } else if (contrastGuidelines.AAALarge) {
    guidLineLevel = 'AAALarge';
  } else if (contrastGuidelines.AALarge) {
    guidLineLevel = 'AALarge';
  }
  
  return guidLineLevel ? `${contrast} / ${guidLineLevel}` : contrast;
}
