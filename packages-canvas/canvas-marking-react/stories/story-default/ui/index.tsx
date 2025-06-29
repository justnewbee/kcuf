import {
  ReactElement
} from 'react';

import {
  Hr
} from '@kcuf/demo-rc';

import TheCanvas from './rc-canvas';
import TheOps from './rc-ops';

export default function DemoUi(): ReactElement {
  return <>
    <TheCanvas />
    <Hr />
    <TheOps /></>;
}
