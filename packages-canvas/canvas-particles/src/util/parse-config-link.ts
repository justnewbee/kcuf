import {
  IParsedConfigLink,
  IParticlesConfig
} from '../types';

import parseConfigLinkBase from './parse-config-link-base';

export default function parseConfigLink(link: IParticlesConfig['link']): IParsedConfigLink | null {
  return parseConfigLinkBase(link);
}