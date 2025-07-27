import {
  ReactElement,
  ButtonHTMLAttributes
} from 'react';
import styled from 'styled-components';

import {
  COLOR_FORM_CONTROL,
  CSS_FORM_CONTROL_BUTTON
} from '../../../const';
import Icon from '../../icon';
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
    color: ${COLOR_FORM_CONTROL.FGC};
    text-decoration: none;
  }
`;
const ScButton = styled.button`
  ${CSS_FORM_CONTROL_BUTTON}
`;
const ScLoading = styled(Icon)`
  margin-right: 4px;
  opacity: 0.6;
`;

export default function Button({
  disabled,
  loading,
  href,
  target,
  label,
  children,
  onClick,
  ...restProps
}: IButtonProps): ReactElement {
  const resolvedHref = disabled ? undefined : href;
  const resolvedOnClick = loading ? undefined : onClick;
  const theLabel = label ?? children;
  
  return resolvedHref ? <ScButtonA {...{
    ...restProps,
    href: resolvedHref,
    target: target ?? getDefaultTarget(resolvedHref),
    onClick: resolvedOnClick
  } as ButtonHTMLAttributes<HTMLAnchorElement>}>
    {loading ? <ScLoading type="loading" /> : null}
    {theLabel}
  </ScButtonA> : <ScButton {...{
    ...restProps,
    disabled,
    onClick: resolvedOnClick
  }}>
    {loading ? <ScLoading type="loading" /> : null}
    {theLabel}
  </ScButton>;
}
