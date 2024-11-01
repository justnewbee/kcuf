import {
  ReactElement,
  Ref,
  Children,
  forwardRef
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  CSS_BLOCK_LEVEL_ELEMENT
} from '../../../const';
import {
  IListProps
} from '../types';

const cssList = css`
  padding-left: 3em;
  ${CSS_BLOCK_LEVEL_ELEMENT}
`;

const ScUl = styled.ul`
  list-style: square;
  ${cssList}
`;

const ScOl = styled.ol`
  list-style: lower-roman;
  ${cssList}
`;

const ScLi = styled.li`
  margin: 4px 0;
`;

function List({
  ordered,
  children,
  ...props
}: IListProps, ref: Ref<HTMLOListElement & HTMLUListElement>): ReactElement {
  const ListComponent = ordered ? ScOl : ScUl;
  
  return <ListComponent ref={ref} {...props}>
    {Children.map(children, (v, i): ReactElement | null => <ScLi key={i}>{v as ReactElement}</ScLi>)}
  </ListComponent>;
}

export default forwardRef(List);
