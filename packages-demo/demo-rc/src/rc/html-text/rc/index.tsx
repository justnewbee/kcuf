import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  CSS_INLINE_ELEMENTS_INSIDE
} from '../../../const';
import {
  IHtmlTextProps
} from '../types';

const ScSpan = styled.span`
  ${CSS_INLINE_ELEMENTS_INSIDE}
`;

/**
 * 将字符串以 HTML 的形式展示，方便需要展示一些带 HTML 的内容的场景
 */
export default function HtmlText({
  text,
  ...restProps
}: IHtmlTextProps): ReactElement {
  return /</.test(text) ? <ScSpan{...restProps} dangerouslySetInnerHTML={{
    __html: text
  }} /> : <span {...restProps}>{text}</span>;
}
