import {
  ComponentProps,
  ComponentType,
  ReactNode
} from 'react';

export interface IFeatureProps {
  Svg: ComponentType<ComponentProps<'svg'>>;
  title: string;
  description: ReactNode;
}