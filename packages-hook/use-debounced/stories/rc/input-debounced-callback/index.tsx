import {
  ReactElement,
  useState
} from 'react';

import {
  Form,
  Em,
  InputText,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useDebouncedCallback
} from '../../../src';

export default function InputDebouncedCallback(): ReactElement {
  const [stateValue, setStateValue] = useState('hello world');
  const [stateDelay, setStateDelay] = useState(500);
  const [stateDelayMax, setStateDelayMax] = useState(0);
  const [stateImmediate, setStateImmediate] = useState(false);
  const debouncedOnChange = useDebouncedCallback((value: string): void => {
    setStateValue(value);
  }, {
    delay: stateDelay,
    delayMax: stateDelayMax,
    immediate: stateImmediate
  });
  
  return <>
    <InputText {...{
      defaultValue: stateValue,
      onChange: debouncedOnChange
    }} />
    <Form {...{
      dense: true,
      items: [{
        label: 'Debounced value',
        content: <Em>{stateValue}</Em>
      }, {
        label: 'delay',
        content: <InputNumber {...{
          step: 500,
          value: stateDelay,
          onChange: setStateDelay
        }} />
      }, {
        label: 'delayMax',
        content: <InputNumber {...{
          step: 500,
          value: stateDelayMax,
          onChange: setStateDelayMax
        }} />
      }, {
        label: 'immediate',
        content: <InputSwitch {...{
          value: stateImmediate,
          onChange: setStateImmediate
        }} />
      }]
    }} />
  </>;
}
