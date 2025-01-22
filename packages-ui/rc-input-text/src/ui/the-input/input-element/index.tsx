import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  SIZE,
  mixinInputTextDisabled,
  mixinInputText
} from '@kcuf/fork-console-base-theme';
import {
  ScBaseInputText
} from '@kcuf/styled-mixin';
import {
  useRefInput,
  useInputDomProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  INNER_HEIGHT_PX
} from '../../../const';

const ScInputElement = styled(ScBaseInputText)`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_M - 2}px;
  width: 100%;
  height: ${INNER_HEIGHT_PX};
  border: 0;
  line-height: ${INNER_HEIGHT_PX};
  
  ${props => {
    if (props.disabled) {
      return mixinInputTextDisabled;
    }
    
    return mixinInputText;
  }}
`;

export default function InputElement(): ReactElement {
  const refInput = useRefInput();
  const inputDomProps = useInputDomProps();
  
  return <ScInputElement {...inputDomProps} ref={refInput} />;
}
