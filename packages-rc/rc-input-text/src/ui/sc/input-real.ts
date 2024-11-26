import styled from 'styled-components';

import {
  SIZE,
  mixinInputTextDisabled,
  mixinInputText,
  // mixinInputTextHover,
  mixinInputTextFocus
} from '@kcuf/fork-console-base-theme';
import {
  ScBaseInputText
} from '@kcuf/styled-mixin';
import {
  InputTextProps
} from '@kcuf/rc-input-text-headless';

import {
  INNER_HEIGHT_PX
} from '../const';

export default styled(ScBaseInputText)<InputTextProps>`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_M - 2}px;
  width: 100%;
  height: ${INNER_HEIGHT_PX};
  border: 0;
  line-height: ${INNER_HEIGHT_PX};
  
  ${props => {
    if (props.disabled) {
      return mixinInputTextDisabled;
    }
    
    if (props.focused) {
      return mixinInputTextFocus;
    }
    
    // if (props.hovered) {
    //   return mixinInputTextHover;
    // }
    
    return mixinInputText;
  }}
`;
