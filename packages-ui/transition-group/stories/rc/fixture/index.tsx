import {
  ReactElement,
  ReactNode
} from 'react';

interface IFixtureProps {
  description?: string;
  children: ReactNode;
}

export default function Fixture({
  description,
  children
}: IFixtureProps): ReactElement {
  return <div>
    <p>{description}</p>
    {children}
  </div>;
}

export type {
  IFixtureProps as FixtureProps
};
