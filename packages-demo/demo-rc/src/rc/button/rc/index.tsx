import {
  ReactElement,
  ButtonHTMLAttributes
} from 'react';
import styled from 'styled-components';

import {
  COLOR_FORM_CONTROL,
  CSS_FORM_CONTROL_BUTTON
} from '../../../const';
import {
  IButtonProps
} from '../types';
import {
  getDefaultTarget
} from '../util';

const ScButtonA = styled.a`
  display: inline-block;
  text-align: center;
  ${CSS_FORM_CONTROL_BUTTON}
  
  &:link,
  &:link:visited,
  &:link:hover {
    text-decoration: none;
    color: ${COLOR_FORM_CONTROL.FGC};
  }
`;
const ScButton = styled.button`
  ${CSS_FORM_CONTROL_BUTTON}
`;

export default function Button({
  disabled,
  href,
  target,
  children,
  ...restProps
}: IButtonProps): ReactElement {
  const resolvedHref = disabled ? undefined : href;
  
  return resolvedHref ? <ScButtonA {...{
    ...restProps as ButtonHTMLAttributes<HTMLAnchorElement>,
    href: resolvedHref,
    target: target ?? getDefaultTarget(resolvedHref)
  }}>{children}</ScButtonA> : <ScButton {...restProps} disabled={disabled}>{children}</ScButton>;
}
