import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  SIZE,
  mixinBorderTertiaryTop
} from '@kcuf/fork-console-base-theme';
import {
  DialogMode,
  DialogButtonProps,
  useDialogMode,
  useDialogButtons
} from '@kcuf-ui/rc-dialog-headless';

import FooterButton from './button';

interface IScProps {
  $mode?: DialogMode;
}

const cssCommon = css`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 ${SIZE.PADDING_X_DIALOG}px;
  box-sizing: border-box;
`;

const cssNormal = css`
  justify-content: flex-end;
  padding-bottom: ${SIZE.PADDING_X_DIALOG}px;
  text-align: right;
`;

const cssSlide = css`
  justify-content: flex-start;
  height: ${SIZE.HEIGHT_DIALOG_SLIDE_FOOTER}px;
  ${mixinBorderTertiaryTop}
`;

const ScFooter = styled.footer<IScProps>`
  ${cssCommon}
  ${props => props.$mode === DialogMode.SLIDE ? cssSlide : cssNormal}
`;

export default function Footer(): ReactElement | null {
  const dialogMode = useDialogMode();
  const buttons: DialogButtonProps[] = useDialogButtons();
  
  return buttons.length ? <ScFooter {...{
    $mode: dialogMode
  }}>
    {buttons.map((v, i): ReactElement => <FooterButton key={i} {...v} />)}
  </ScFooter> : null;
}
