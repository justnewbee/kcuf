import {
  EModifier
} from '../enum';
import {
  MODIFIER_MAPPING
} from '../const';

export default function normalizeModifier(modifier: string): EModifier | null {
  return MODIFIER_MAPPING[modifier.toLowerCase()] || null;
}