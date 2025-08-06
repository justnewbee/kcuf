import {
  ReactElement
} from 'react';

import PkgInstall from '../../pkg-install';
import PkgImport from '../../pkg-import';
import {
  IPkgBriefProps
} from '../types';

import {
  ScKeyValue,
  ScKeyValueK,
  ScKeyValueV
} from './sc.styled';

/**
 * NPM 包基本信息描述（设计参考：https://mantine.dev）
 */
export default function PkgBrief(props: IPkgBriefProps): ReactElement {
  const {
    name,
    named,
    pkg
  } = props;
  
  return <>
    <blockquote>{props.children}</blockquote>
    <ScKeyValue>
      <div>
        <ScKeyValueK>Install</ScKeyValueK>
        <ScKeyValueV>
          <PkgInstall {...{
            pkg
          }} />
        </ScKeyValueV>
      </div>
      <div>
        <ScKeyValueK>Import</ScKeyValueK>
        <ScKeyValueV>
          <PkgImport {...{
            name,
            named,
            pkg
          }} />
        </ScKeyValueV>
      </div>
    </ScKeyValue>
  </>;
}
