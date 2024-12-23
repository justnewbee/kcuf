import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize,
  H2,
  InputSwitch
} from '@kcuf/demo-rc';
import Icon from '@kcuf-ui/rc-icon';

import Button, {
  ButtonPreset
} from '../src';

const ScButtonThemes = styled(Button)`
  margin: 2px;
`;

export default function DemoDefault(): ReactElement {
  const [stateDom, setStateDom] = useState<HTMLElement | null>(null);
  const [stateDisabled, setStateDisabled] = useState(false);
  
  return <>
    <MinimalNormalize />
    {/* <ComponentTesting<ButtonProps> {...{ */}
    {/*   componentName: 'Button', */}
    {/*   componentPackageName: '@kcuf-ui/rc-button', */}
    {/*   defaultProps: DEFAULT_PROPS, */}
    {/*   renderer */}
    {/* }} /> */}
    <H2>Ref Works Right</H2>
    <Button {...{
      ref: setStateDom,
      label: 'ref shall work right',
      preset: ButtonPreset.PRIMARY,
      onClick() {
        // eslint-disable-next-line no-console
        console.info(stateDom);
      }
    }} />
    <H2>All Presets</H2>
    <div>
      <InputSwitch {...{
        label: 'props.disabled',
        value: stateDisabled,
        onChange: setStateDisabled
      }} />
    </div>
    {Object.entries(ButtonPreset).map(([k, v]) => <ScButtonThemes key={k} {...{
      preset: v,
      label: v,
      disabled: stateDisabled
    }} />)}
    <H2>垂直对齐 IconLeft / IconRight</H2>
    <Button {...{
      iconLeft: ' ',
      textAlign: 'left',
      label: 'icon left NONE'
    }} />
    <br />
    <Button {...{
      iconLeft: <Icon type="search" />,
      textAlign: 'left',
      label: 'icon left search'
    }} />
    <br />
    <Button {...{
      iconLeft: ' ',
      iconRight: <Icon type="arrowhead" />,
      textAlign: 'left',
      label: 'icon right arrowhead'
    }} />
    <H2>Loading</H2>
    <Button loading>Loading</Button>
  </>;
}
