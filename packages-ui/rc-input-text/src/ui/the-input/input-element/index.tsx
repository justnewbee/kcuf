import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  SIZE,
  mixinInputSwitchDisabled,
  mixinInputSwitch,
  // mixinInputSwitchHover,
  mixinInputSwitchFocus
} from '@kcuf/fork-console-base-theme';
import {
  ScBaseInputSwitch
} from '@kcuf/styled-mixin';
import {
  useRefInput,
  useInputDomProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  INNER_HEIGHT_PX
} from '../../../const';

interface IScProps {
  $focused?: boolean;
}

const ScInputElement = styled(ScBaseInputSwitch)<IScProps>`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_M - 2}px;
  width: 100%;
  height: ${INNER_HEIGHT_PX};
  border: 0;
  line-height: ${INNER_HEIGHT_PX};
  
  ${props => {
    if (props.disabled) {
      return mixinInputSwitchDisabled;
    }
    
    if (props.$focused) {
      return mixinInputSwitchFocus;
    }
    
    // if (props.hovered) {
    //   return mixinInputSwitchHover;
    // }
    
    return mixinInputSwitch;
  }}
`;

export default function InputElement(): ReactElement {
  const refInput = useRefInput();
  const inputDomProps = useInputDomProps();
  
  return <ScInputElement {...inputDomProps} ref={refInput} />;
}
