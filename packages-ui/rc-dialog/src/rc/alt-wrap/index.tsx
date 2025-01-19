import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  mixinTypoLineWrap,
  mixinTextPrimary,
  mixinTextSecondary
} from '@kcuf/fork-console-base-theme';
import Icon, {
  IconType
} from '@kcuf-ui/rc-icon';

import {
  TDialogAltIconType
} from '../../types';

interface IProps {
  type?: TDialogAltIconType;
  title?: string | ReactElement;
  content?: string | ReactElement;
}

function getIconType(type?: TDialogAltIconType): IconType {
  switch (type) {
  case 'warn':
    return 'warn-fill';
  case 'confirm':
    return 'help-fill';
  case 'success':
    return 'success-fill';
  case 'error':
    return 'error-fill';
  default:
    return 'info-fill';
  }
}

const ICON_SIZE = 24;
const SPACING = 8;

const ScAltWrap = styled.div`
  position: relative;
  padding: ${SPACING * 2}px ${ICON_SIZE + SPACING}px 0 ${ICON_SIZE + SPACING}px;
  min-height: ${ICON_SIZE + SPACING * 2}px;
`;

const ScIcon = styled(Icon)`
  position: absolute;
  top: ${SPACING * 2}px;
  left: 0;
  font-size: ${ICON_SIZE}px;
  
  &::before {
    display: block;
  }
`;

const ScTitle = styled.h5`
  margin: 0 0 12px;
  padding: 0;
  font-size: 16px;
  line-height: ${ICON_SIZE}px;
  ${mixinTextPrimary}
  ${mixinTypoLineWrap}
`;

const ScContent = styled.div`
  font-size: 14px;
  line-height: 22px;
  ${mixinTextSecondary}
  ${mixinTypoLineWrap}
`;

/**
 * alert / confirm 的包裹
 */
export default function AltWrap({
  type,
  title,
  content
}: IProps): ReactElement {
  return <ScAltWrap>
    <ScIcon type={getIconType(type)} colored />
    {title ? <ScTitle>{title}</ScTitle> : null}
    <ScContent>{content}</ScContent>
  </ScAltWrap>;
}
