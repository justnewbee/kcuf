import styled, {
  css
} from 'styled-components';

import {
  CSS_FORM_CONTROL_INPUT_BASE
} from '../../const';

interface IScInput {
  $block?: boolean;
}

const CSS_BLOCK = css`
  display: block;
  margin: 1px 0;
  width: 100%;
`;

export const ScInput = styled.input<IScInput>`
  ${CSS_FORM_CONTROL_INPUT_BASE}
  min-width: 100px;
  max-width: 100%;
  ${props => props.$block ? CSS_BLOCK : null}
`;
