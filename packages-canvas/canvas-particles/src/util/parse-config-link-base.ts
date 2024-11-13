import {
  IParsedConfigLink,
  TConfigLink
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_CONFIG_LINK,
  DEFAULT_CONFIG_HOVER_LINK
} from '../const';

import clampOpacity from './clamp-opacity';

export default function parseConfigLinkBase(link?: TConfigLink, hover?: boolean): IParsedConfigLink | null {
  if (!link) {
    return null;
  }
  
  const {
    distance: defaultDistance,
    width: defaultWidth,
    color: defaultColor,
    opacity: defaultOpacity
  } = hover ? DEFAULT_CONFIG_HOVER_LINK : DEFAULT_CONFIG_LINK;
  
  if (link === true) {
    return {
      distance: defaultDistance * PIXEL_RATIO,
      width: defaultWidth * PIXEL_RATIO,
      color: defaultColor,
      opacity: defaultOpacity
    };
  }
  
  if (typeof link === 'number') {
    return link > 0 ? {
      distance: link * PIXEL_RATIO,
      width: defaultWidth * PIXEL_RATIO,
      color: defaultColor,
      opacity: defaultOpacity
    } : null;
  }
  
  const {
    distance = defaultDistance,
    width = defaultWidth,
    color = defaultColor,
    opacity = defaultOpacity
  } = link;
  
  if (distance <= 0) {
    return null;
  }
  
  return {
    distance: distance * PIXEL_RATIO,
    width: width * PIXEL_RATIO,
    color,
    opacity: clampOpacity(opacity)
  };
}
