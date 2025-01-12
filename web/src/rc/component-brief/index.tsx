import {
  ReactElement
} from 'react';
// import styled from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


interface IComponentBriefProps {
  name: string;
  usage: string;
  git: string;
  npm: string;
}

/**
 * 用于 `docs/component` 下，作为组件的基本信息描述
 *
 * 设计参考：https://mantine.dev
 */
export default function ComponentBrief(props: IComponentBriefProps): ReactElement {
  const docusaurusContext = useDocusaurusContext();
  
  const {
    name,
    usage,
    git,
    npm
  } = props;
  const importCode = `import { ${name} } from @kcuf-ui;</code>`;
  
  return <>
    <ul>
      <li>Import <code>{importCode}</code></li>
      <li>Source {git}</li>
      <li>Package {npm}</li>
    </ul>
  </>;
}
