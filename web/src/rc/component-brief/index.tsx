import _flow from 'lodash/flow';
import _upperFirst from 'lodash/upperFirst';
import _camelCase from 'lodash/camelCase';
import _kebabCase from 'lodash/kebabCase';
import {
  ReactElement,
  ReactNode
} from 'react';
import styled from 'styled-components';

import Icon from '../icon';
import ImportFrom from '../import-from';

interface IComponentBriefProps {
  children: NonNullable<ReactNode>;
  name: string;
}

const pascalCase = _flow(_camelCase, _upperFirst);

const ScKeyValue = styled.div`
  margin: 0.5rem 0 1.5rem;
  font-size: 0.9em;
`;
const ScKeyValueK = styled.span`
  display: inline-block;
  min-width: 6.25rem;
  opacity: 0.5;
`;
const ScKeyValueV = styled.span`
  margin-left: 0.5rem;
  
  i {
    margin-right: 0.4rem;
    font-size: 1.05em;
  }
`;

/**
 * 用于 `docs/component` 下，作为组件的基本信息描述
 *
 * 设计参考：https://mantine.dev
 */
export default function ComponentBrief(props: IComponentBriefProps): ReactElement {
  const {
    name
  } = props;
  const gitPath = `packages-ui/rc-${_kebabCase(name)}`;
  const npmName = `@kcuf-ui/rc-${_kebabCase(name)}`;
  
  return <>
    <blockquote>{props.children}</blockquote>
    <ScKeyValue>
      <div>
        <ScKeyValueK>Import</ScKeyValueK>
        <ScKeyValueV>
          <ImportFrom {...{
            name: pascalCase(name)
          }} />
        </ScKeyValueV>
      </div>
      <div>
        <ScKeyValueK>Source</ScKeyValueK>
        <ScKeyValueV>
          <Icon type="github" colored />
          <a href={`https://github.com/justnewbee/kcuf/tree/master/${gitPath}`} target="_blank" rel="noreferrer">{gitPath}</a>
        </ScKeyValueV>
      </div>
      <div>
        <ScKeyValueK>Package</ScKeyValueK>
        <ScKeyValueV>
          <Icon type="npm" colored />
          <a href={`https://www.npmjs.com/package/${npmName}`} target="_blank" rel="noreferrer">{npmName}</a>
        </ScKeyValueV>
      </div>
    </ScKeyValue>
  </>;
}
