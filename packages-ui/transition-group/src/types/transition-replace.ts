import {
  ReactElement
} from 'react';

export interface ITransitionReplaceProps {
  in: boolean;
  children: [ReactElement, ReactElement];
}
