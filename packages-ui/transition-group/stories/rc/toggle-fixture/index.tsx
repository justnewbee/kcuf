import {
  ReactElement,
  cloneElement,
  useState,
  useCallback
} from 'react';

import Fixture, {
  FixtureProps
} from '../fixture';

interface IToggleFixtureProps extends FixtureProps {
  defaultIn?: boolean;
}

export default function ToggleFixture({
  defaultIn,
  description,
  children
}: IToggleFixtureProps): ReactElement {
  const [stateIn, setStateIn] = useState(defaultIn);
  const handleToggle = useCallback(() => setStateIn(prevValue => !prevValue), [setStateIn]);
  
  return <Fixture description={description}>
    <div style={{ marginBottom: 10 }}>
      <button onClick={handleToggle}>
        Toggle
      </button>
    </div>
    {cloneElement(children, {
      in: stateIn
    })}
  </Fixture>;
}
