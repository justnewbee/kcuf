import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScFormControlWithLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-inline-end: 1.25em;
  color: #777;
  vertical-align: middle;
  transition: color 0.3s ease-in-out;
  
  &:last-child {
    margin-inline-end: 0;
  }
`;

const ScSwitchLabel = styled.span`
  margin-inline-start: 0.4em;
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
