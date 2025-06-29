import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  COLOR,
  SPACE
} from '../src';

const ScSpace = styled.div`
  display: flex;
  align-items: center;
`;
const ScBlock = styled.div`
  height: ${SPACE[4]};
  background: hsla(0 0% 0% / 5%);
`;
const ScInfo = styled.div`
  margin-left: ${SPACE[3]};
  color: ${COLOR.GRAY[7]};
`;

export default function StorySpace(): ReactElement {
  return <>
    {SPACE.map((v, i) => <ScSpace key={v}>
      <ScBlock style={{
        width: v
      }} />
      <ScInfo>{`#${i + 1}`} = {v}</ScInfo>
    </ScSpace>)}
  </>;
}
