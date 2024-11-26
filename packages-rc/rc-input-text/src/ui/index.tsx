import {
  ReactElement
} from 'react';

import {
  useProps,
  useHovered,
  useFocused,
  useHandleMouseEnter,
  useHandleMouseLeave
} from '@kcuf/rc-input-text-headless';

import {
  ScInput
} from './sc';
import {
  TheInput,
  InnerLeft,
  InnerRight,
  InnerRightStatus
} from './rc-container';

export default function Ui(): ReactElement {
  const {
    theme,
    block,
    round,
    borderless,
    disabled,
    weakFocusStyle,
    className,
    style
  } = useProps();
  const hovered = useHovered();
  const focused = useFocused();
  const handleMouseEnter = useHandleMouseEnter();
  const handleMouseLeave = useHandleMouseLeave();
  
  return <ScInput {...{
    className,
    style,
    theme,
    block,
    round,
    weakFocusStyle,
    borderless,
    disabled,
    hovered,
    focused,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }}>
    <InnerLeft />
    <TheInput />
    <InnerRight />
    <InnerRightStatus />
  </ScInput>;
}
