import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  SIZE,
  mixinBgPrimary,
  mixinBorderTertiary,
  mixinBorderRadiusM,
  mixinShadowL,
  mixinShadowLUp
} from '@alicloud/console-base-theme';
import Backdrop from '@kcuf/rc-backdrop';

import {
  DialogMode,
  DialogSize,
  useProps,
  useRefDialog,
  useRefDialogContent,
  useStateActive,
  useDialogMode,
  useDialogSize,
  useDialogStyle
} from '../model';

import {
  Header,
  Content,
  Footer,
  X
} from './rc-container';

interface IScDialogProps {
  $active: boolean;
}

const cssNormal = css<IScDialogProps>`
  top: ${props => (props.$active ? '40%' : '25%')};
  left: 50%;
  min-height: 64px;
  transform: translate(-50%, -50%);
  ${mixinBorderRadiusM}
`;

const cssSlide = css<IScDialogProps>`
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  transform: translateX(${props => (props.$active ? '0' : '100%')});
`;

const cssSlideUp = css<IScDialogProps>`
  display: flex;
  flex-direction: column;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(${props => (props.$active ? '0' : '100%')});
  ${mixinShadowLUp}
`;

// 其实 HTML 有 dialog 元素，但浏览器支持不佳，目前只好用 div
const ScDialog = styled.div<IScDialogProps>`
  position: fixed;
  opacity: ${props => (props.$active ? 1 : 0.66)};
  outline: none;
  min-width: 320px;
  max-width: 100%;
  font-size: 12px;
  transition: all ease-in 200ms;
  ${mixinBgPrimary}
  ${mixinBorderTertiary}
  ${mixinShadowL}
  
  /* stylelint-disable */
  &[data-dialog-mode=${DialogMode.SLIDE}] {
    ${cssSlide}
    
    .hasTopbar & {
      top: ${SIZE.HEIGHT_TOP_NAV}px;
    }
  }
  
  &[data-dialog-mode=${DialogMode.SLIDE_UP}] {
    ${cssSlideUp}
    
    &[data-dialog-size=${DialogSize.FULL}] {
      top: 0;
      
      .hasTopbar & {
        top: ${SIZE.HEIGHT_TOP_NAV}px;
      }
    }
  }
  
  &[data-dialog-mode=${DialogMode.NORMAL}] {
    ${cssNormal}
  }
`;

/**
 * Dialog 本 Dialog
 */
export default function DialogUi(): ReactElement {
  const {
    className,
    closable,
    backdrop
  } = useProps();
  const refDialog = useRefDialog();
  const refDialogContent = useRefDialogContent();
  const active = useStateActive();
  const dialogMode = useDialogMode();
  const dialogSize = useDialogSize();
  const style = useDialogStyle();
  
  return <ScDialog {...{
    $active: active,
    ref: refDialog,
    className,
    tabIndex: 0,
    style,
    role: 'dialog',
    'aria-modal': true,
    // 以下用于样式钩子
    'data-dialog-mode': dialogMode,
    'data-dialog-size': typeof dialogSize === 'string' ? dialogSize : undefined
  }}>
    <Header />
    <Content ref={refDialogContent} />
    <Footer />
    {closable ? <X /> : null}
    {backdrop ? <Backdrop /> : null}
  </ScDialog>;
}
