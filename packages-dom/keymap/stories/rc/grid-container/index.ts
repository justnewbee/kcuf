import styled from 'styled-components';

interface IScProps {
  $repeat?: number;
}

export default styled.div<IScProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.$repeat ?? 12}, 1fr);
  gap: 4px;
`;
