import {
  ReactElement,
  useState,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  InputSwitch,
  InputNumber
} from '@kcuf/demo-rc';

import Backdrop from '../../../src';

const ScShowMeBackdrop = styled.div`
  margin: 2px;
  padding: 8px;
  position: relative;
  background-color: rgb(255 255 255 / 7%);
  z-index: 1234;
`;

export default function ShowMeBackdrop(): ReactElement {
  const [stateZ, setStateZ] = useState(100);
  const [stateClosable, setStateClosable] = useState(true);
  const [stateOpen, setStateOpen] = useState(false);
  
  const handleBackdropClose = useCallback(() => {
    setStateOpen(false);
  }, []);
  
  return <ScShowMeBackdrop>
    <InputNumber {...{
      placeholder: 'props.zIndex',
      value: stateZ,
      onChange: setStateZ
    }} />
    <InputSwitch {...{
      label: 'props.closable',
      value: stateClosable,
      onChange: setStateClosable
    }} />
    <InputSwitch {...{
      label: 'Show me backdrop',
      value: stateOpen,
      onChange: setStateOpen
    }} />
    {stateOpen ? <Backdrop {...{
      zIndex: stateZ,
      closable: stateClosable,
      onClose: handleBackdropClose
    }} /> : null}
  </ScShowMeBackdrop>;
}