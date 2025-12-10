import {
  HTMLAttributes, Ref
} from 'react';

export interface IListProps extends HTMLAttributes<Element> {
  ref?: Ref<HTMLOListElement & HTMLUListElement>;
  ordered?: boolean;
}
