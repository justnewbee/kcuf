import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
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
  const [stateLoading, setStateLoading] = useState(false);
  
  return <>
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
      <InputSwitch {...{
        label: 'props.loading',
        value: stateLoading,
        onChange: setStateLoading
      }} />
    </div>
    {Object.entries(ButtonPreset).map(([k, v]) => <ScButtonThemes key={k} {...{
      preset: v,
      label: v,
      disabled: stateDisabled,
      loading: stateLoading
    }} />)}
    <H2>垂直对齐 IconStart / IconEnd</H2>
    <Button {...{
      iconStart: ' ',
      textAlign: 'l',
      label: 'icon left NONE'
    }} />
    <br />
    <Button {...{
      iconStart: <Icon type="search" />,
      textAlign: 'l',
      label: 'icon left search'
    }} />
    <br />
    <Button {...{
      iconStart: ' ',
      iconEnd: <Icon type="arrowhead" />,
      textAlign: 'l',
      label: 'icon right arrowhead'
    }} />
    <H2>Loading</H2>
    <Button loading>Loading</Button>
    <H2>fluid & text-align</H2>
    <Button fluid loading textAlign="l">textAlign: l</Button>
    <Button fluid loading textAlign="c">textAlign: c</Button>
    <Button fluid loading textAlign="r">textAlign: r</Button>
  </>;
}
