import styled, {
  css
} from 'styled-components';

interface IScColorBlockProps {
  $transparent?: boolean;
}

export default styled.div<IScColorBlockProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 8px 4px;
  border-radius: 2px;
  font-size: 10px;
  ${props => props.$transparent ? css`
    background: hsl(0 0% 95%) 0 0/16px 16px url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"%3E%3Cpath d="M1 2V0h1v1H0v1z" fill-opacity=".07"/%3E%3C/svg%3E')
  ` : null}
`;
