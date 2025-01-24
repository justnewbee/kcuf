import {
  LIGHTNESS_LEVELS
} from '../const';

import useModelState from './_use-model-state';
import useGetHslColorString from './use-get-hsl-color-string';

export default function useColorArrayCode(): string {
  const {
    selectedHueLightness
  } = useModelState();
  const getHslColorString = useGetHslColorString();
  
  if (!selectedHueLightness) {
    return '';
  }
  
  return JSON.stringify(LIGHTNESS_LEVELS.map(lightness => getHslColorString(selectedHueLightness[0], lightness)), null, 2);
}
