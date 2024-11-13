import {
  ReactElement
} from 'react';

export type IComponentTestingProcessPropsFn<P> = (props: P, o: Record<string, unknown>) => void;

export interface IComponentTestingProps<P> {
  componentName: string;
  componentPackageName: string;
  componentIsDefaultExport?: boolean;
  defaultProps?: Record<string, unknown>;
  processProps?: IComponentTestingProcessPropsFn<P>;
  renderer?(props: P): string | ReactElement;
}
