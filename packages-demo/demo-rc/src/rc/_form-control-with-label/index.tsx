import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScFormControlWithLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin: 0 1.25em 0 1em;
  color: #777;
  vertical-align: middle;
  transition: color 0.3s ease-in-out;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const ScSwitchLabel = styled.span`
  margin-left: 8px;
  color: #777;
`;

interface IFormControlWithLabelProps {
  label?: string | ReactElement;
  children: ReactElement;
}

export default function FormControlWithLabel({
  label,
  children
}: IFormControlWithLabelProps): ReactElement {
  return <ScFormControlWithLabel>
    {children}
    {label ? <ScSwitchLabel>{label}</ScSwitchLabel> : null}
  </ScFormControlWithLabel>;
}
