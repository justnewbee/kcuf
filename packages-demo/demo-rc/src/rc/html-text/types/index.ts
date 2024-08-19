import {
  HTMLAttributes
} from 'react';

export interface IHtmlTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  text: string;
}