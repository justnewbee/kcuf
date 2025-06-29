import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  H1,
  DatasourceItem,
  InputSwitch,
  ChoiceGroupRadio
} from '@kcuf/demo-rc';

import Button, {
  ButtonPreset,
  ButtonSize
} from '../src';

const ScButtonThemes = styled(Button)`
  margin: 2px;
`;

const SIZES: DatasourceItem<ButtonSize>[] = [
  'none',
  'xs',
  's',
  'm',
  'l',
  'xl'
].map(v => ({
  label: v,
  value: v as ButtonSize
}));

export default function StoryVariant(): ReactElement {
  const [stateDisabled, setStateDisabled] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [stateSize, setStateSize] = useState<ButtonSize>();
  
  return <>
    <H1>All Variants</H1>
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
      <br />
      <ChoiceGroupRadio {...{
        datasource: SIZES,
        value: stateSize,
        onChange: setStateSize
      }} /></div>
    {Object.entries(ButtonPreset).map(([k, v]) => <ScButtonThemes key={k} {...{
      preset: v,
      label: v,
      size: stateSize,
      disabled: stateDisabled,
      loading: stateLoading
    }} />)}
  </>;
}
