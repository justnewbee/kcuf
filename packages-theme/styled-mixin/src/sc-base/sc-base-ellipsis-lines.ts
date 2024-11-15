import styled, {
  css
} from 'styled-components';

interface IEllipsisLinesProps {
  $lines: number;
  $lineHeight: number;
  $max?: boolean;
}

export default styled.div<IEllipsisLinesProps>`
  /* stylelint-disable */
  display: -webkit-box;
  line-height: ${props => props.$lineHeight}px;
  overflow: hidden;
  -webkit-line-clamp: ${props => props.$lines};
  -webkit-box-orient: vertical;
  ${props => {
    const h = props.$lineHeight * props.$lines;
    
    return props.$max ? css`
      max-height: ${h}px;
    ` : css`
      height: ${h}px;
    `;
  }}
`;
