import styled from 'styled-components';

interface IScProps {
  $repeat?: number;
}

export default styled.div<IScProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.$repeat ?? 12}, minmax(0, 1fr));
  grid-template-rows: auto;
  gap: 4px;
  margin-block: 8px;
`;
