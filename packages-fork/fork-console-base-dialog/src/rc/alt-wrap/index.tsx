import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  mixinTypoLineWrap,
  mixinTextPrimary,
  mixinTextSecondary
} from '@alicloud/console-base-theme';
import Icon, {
  IconType
} from '@kcuf/rc-icon';

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
  padding: 0 ${SPACING * 2}px 0 ${ICON_SIZE + SPACING}px;
  min-height: ${ICON_SIZE + SPACING * 2}px;
`;

const ScIcon = styled(Icon)`
  position: absolute;
  top: 0;
  left: 0;
  font-size: ${ICON_SIZE}px;
  
  &::before {
    display: block;
  }
`;

const ScTitle = styled.h5`
  margin: 0 0 12px;
  padding: 0;
  line-height: ${ICON_SIZE}px;
  font-size: 16px;
  ${mixinTextPrimary}
  ${mixinTypoLineWrap}
`;

const ScContent = styled.div`
  line-height: 22px;
  font-size: 14px;
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
