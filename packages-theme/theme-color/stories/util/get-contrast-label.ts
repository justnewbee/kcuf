import {
  getContrastGuidelines
} from '@kcuf/mere-color';

export default function getContrastLabel(color: string, dark?: boolean): string | number {
  const againstColor = dark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)';
  const contrastGuidelines = getContrastGuidelines(color, againstColor);
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
  
  return guidLineLevel ? `${contrastGuidelines.contrast} / ${guidLineLevel} | ${contrastGuidelines.contrast}` : contrastGuidelines.contrast;
}
