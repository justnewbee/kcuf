import {
  ReactElement,
  ComponentType,
  useState
} from 'react';
import styled from 'styled-components';

import {
  ThemeToggleProps
} from '../../src';

interface IProps {
  ThemeToggleComponent: ComponentType<ThemeToggleProps>;
  title: string;
  description: string;
}

const ScToggleContainer = styled.div`
  padding: 1rem;
  font-size: 6rem;
`;

export default function DemoItem({
  ThemeToggleComponent,
  title,
  description
}: IProps): ReactElement {
  const [stateToggled, setStateToggled] = useState(false);
  
  return <div>
    <ScToggleContainer>
      <ThemeToggleComponent {...{
        toggled: stateToggled,
        onClick: () => setStateToggled(value => !value)
      }} />
    </ScToggleContainer>
    <div>{title}</div>
    <div>{description}</div>
  </div>;
}
