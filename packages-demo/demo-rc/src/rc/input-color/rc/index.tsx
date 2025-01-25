import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import useControllable from '@kcuf-hook/use-controllable';

import {
  HEIGHT_FORM_CONTROL,
  CSS_FORM_CONTROL_BASE
} from '../../../const';
import InputRange from '../../input-range';
import {
  TInputColorRef,
  IInputColorProps
} from '../types';

const ScInputColor = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  vertical-align: middle;
`;
const ScInputColorWrap = styled.div`
  position: relative;
  margin-right: 8px;
  width: ${HEIGHT_FORM_CONTROL}px;
  height: ${HEIGHT_FORM_CONTROL}px;
  ${CSS_FORM_CONTROL_BASE}
  
  input[type="color"] {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    margin: 0;
    padding: 0;
    width: 100%;
    height: ${HEIGHT_FORM_CONTROL}px;
    visibility: visible;
    opacity: 0;
    border: 0;
    box-sizing: border-box;
  }
`;
const ScColorDisplay = styled.div`
  position: absolute;
  inset: 4px;
`;

function parseColor(hexa: string): [string, number] {
  if (hexa.length === 9) {
    const hex = hexa.substring(0, 7);
    const alpha = parseInt(hexa.substring(7), 16);
    
    return [hex, isNaN(alpha) ? 255 : alpha];
  }
  
  return [hexa, 255];
}

function composeHexa(hex: string, alpha: number): string {
  return `${hex}${alpha >= 255 ? '' : alpha.toString(16).padStart(2, '0')}`;
}

function InputColor({
  withAlpha,
  value,
  defaultValue,
  onChange,
  ...props
}: IInputColorProps, ref: TInputColorRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable('#9900ff', value, defaultValue, onChange);
  const [hex, alpha] = parseColor(controllableValue);
  
  const handleHexChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(composeHexa(e.target.value, alpha));
  }, [alpha, controllableOnChange]);
  const handleAlphaChange = useCallback((alphaValue: number) => {
    controllableOnChange(composeHexa(hex, alphaValue));
  }, [hex, controllableOnChange]);
  
  return <ScInputColor>
    <ScInputColorWrap>
      <ScColorDisplay {...{
        style: {
          backgroundColor: controllableValue
        }
      }} />
      <input {...{
        ...props,
        value: hex,
        type: 'color',
        onChange: handleHexChange
      }} ref={ref} />
    </ScInputColorWrap>
    {withAlpha ? <InputRange {...{
      min: 0,
      max: 255,
      value: alpha,
      onChange: handleAlphaChange
    }} /> : null}
  </ScInputColor>;
}

export default forwardRef(InputColor);
