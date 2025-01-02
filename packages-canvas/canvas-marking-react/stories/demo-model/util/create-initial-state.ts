import {
  IModelState
} from '../types';
import {
  EDataType
} from '../enum';

import getDataImage from './get-data-image';
import getDataMarkings from './get-data-markings';

const defaultDataType = EDataType.ARIAL;

export default function createInitialState(): IModelState {
  return {
    destroyed: false,
    editable: true,
    debugEvents: true,
    dataType: defaultDataType,
    image: getDataImage(defaultDataType),
    markings: getDataMarkings(defaultDataType),
    plugins: {
      cursor: true,
      tooltip: true,
      magnet: true,
      snapping: true,
      zoom: true,
      move: true,
      stats: true,
      fps: true
    },
    markingStats: null
  };
}
