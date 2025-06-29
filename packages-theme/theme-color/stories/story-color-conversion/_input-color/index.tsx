import {
  ReactElement,
  useState,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  Rgb,
  parseToRgb,
  toString
} from '@kcuf/mere-color';

import {
  PartR,
  PartG,
  PartB,
  PartA,
  PartComplete
} from './_parts';

interface IProps {
  rgbaMode?: boolean;
  value?: Rgb;
  onChange?(value: Rgb, color: string): void;
}

const ScColor = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
`;

const ScColorFn = styled.span`
  color: hsl(0 0% 0% / 70%);
`;

export default function InputColor({
  rgbaMode,
  value,
  onChange
}: IProps): ReactElement {
  const [stateValue, setStateValue] = useState<Rgb>(value || {
    r: 128,
    g: 0,
    b: 128,
    a: 20
  });
  const handleValueChange = useCallback((o: Partial<Rgb>): void => {
    const newValue: Rgb = {
      ...stateValue,
      ...o
    };
    
    setStateValue(newValue);
    onChange?.(newValue, toString(newValue));
  }, [onChange, stateValue]);
  const finalValue: Rgb = value ?? stateValue;
  const finalColorString = toString(finalValue);
  const handleChangeR = useCallback((n: number) => handleValueChange({
    r: n
  }), [handleValueChange]);
  const handleChangeG = useCallback((n: number) => handleValueChange({
    g: n
  }), [handleValueChange]);
  const handleChangeB = useCallback((n: number) => handleValueChange({
    b: n
  }), [handleValueChange]);
  const handleChangeA = useCallback((n: number) => handleValueChange({
    a: n
  }), [handleValueChange]);
  const handleCompleteChange = useCallback((completeColorString: string) => {
    const rgb = parseToRgb(completeColorString);
    
    if (rgb) {
      handleValueChange(rgb);
    }
  }, [handleValueChange]);
  
  return <ScColor style={{
    backgroundColor: finalColorString
  }}>
    <PartR value={finalValue.r} onChange={handleChangeR} />
    <PartG value={finalValue.g} onChange={handleChangeG} />
    <PartB value={finalValue.b} onChange={handleChangeB} />
    {rgbaMode ? <PartA value={finalValue.a} onChange={handleChangeA} /> : null}
    <ScColorFn>→</ScColorFn>
    <PartComplete {...{
      value: finalColorString,
      onChange: handleCompleteChange
    }} /></ScColor>;
}
