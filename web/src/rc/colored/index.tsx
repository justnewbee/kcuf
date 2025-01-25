import {
  ReactElement
} from 'react';

interface IProps {
  color: string;
  children: string;
}

export default function Colored({
  color,
  children
}: IProps): ReactElement {
  return <strong style={{ color }}>{children}</strong>;
}
