import {
  IParsedConfigLink,
  IParticlesConfig
} from '../types';

import parseConfigLinkBase from './parse-config-link-base';

export default function parseConfigHoverLink(hoverLink: IParticlesConfig['hoverLink']): IParsedConfigLink | null {
  return parseConfigLinkBase(hoverLink, true);
}