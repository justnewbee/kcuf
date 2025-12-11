import {
  SVGProps
} from 'react';

export interface IThemeToggleProps extends SVGProps<SVGSVGElement> {
  toggled?: boolean;
  duration?: number;
  reversed?: boolean;
  forceMotion?: boolean;
}
