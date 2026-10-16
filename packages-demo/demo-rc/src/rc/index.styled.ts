import styled, {
  css
} from 'styled-components';

import {
  CSS_FORM_CONTROL_INPUT_BASE
} from '../const';

interface IScInput {
  $block?: boolean;
}

export const ScInput = styled.input<IScInput>`
  ${CSS_FORM_CONTROL_INPUT_BASE}
  min-width: 100px;
  max-width: 100%;
  ${props => props.$block ? css`
    display: block;
    margin: 1px 0;
    width: 100%;
  ` : null}
`;

export const ScChoiceGroup = styled.div`
  line-height: 2;
  
  form & {
    display: inline-block;
    vertical-align: middle;
  }
`;
