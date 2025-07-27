import {
  ReactElement,
  Children
} from 'react';
import styled from 'styled-components';

import {
  IFlexProps
} from '../types';

interface IScPropsItem {
  $n?: number;
}

const ScFlex = styled.div`
  display: flex;
`;
const ScFlexItem = styled.div<IScPropsItem>`
  flex: ${props => props.$n ?? 1};
  overflow: auto;
`;

/**
 * 用于有横向展示需求的场景
 */
export default function Flex({
  ratio = [],
  children,
  ...props
}: IFlexProps): ReactElement {
  return <ScFlex {...props}>
    {Children.map(children, (v, i) => {
      return v ? <ScFlexItem $n={ratio[i]}>{v}</ScFlexItem> : null;
    })}
  </ScFlex>;
}
