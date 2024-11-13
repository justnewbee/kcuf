import {
  colord
} from 'colord';

export default function parseConfigColor(baseColor: string, configColor?: number | string): string {
  if (typeof configColor === 'string') {
    return configColor;
  }
  
  if (typeof configColor === 'number') {
    return colord(baseColor).alpha(configColor).toHslString();
  }
  
  return baseColor;
}
