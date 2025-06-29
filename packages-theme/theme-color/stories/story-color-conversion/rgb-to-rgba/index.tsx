import {
  ReactElement,
  useState,
  useMemo
} from 'react';
import styled from 'styled-components';

import {
  Rgb,
  toString,
  a11yReadableColor
} from '@kcuf/mere-color';
import {
  H2,
  P
} from '@kcuf/demo-rc';

import InputColor from '../_input-color';

const ScColorMix = styled.div`
  display: flex;
  align-items: center;
`;

const ScSign = styled.div`
  padding: 8px;
`;

function extractRgbaColorBasedOnWhite(r0: number, g0: number, b0: number): Rgb {
  const a = 1 - Math.min(r0, g0, b0) / 255;
  
  return {
    r: 255 - Math.round((255 - r0) / a),
    g: 255 - Math.round((255 - g0) / a),
    b: 255 - Math.round((255 - b0) / a),
    a: a * 100
  };
}

function extractRgbaColorBasedOnBlack(r0: number, g0: number, b0: number): Rgb {
  const a = 1 - Math.max(r0, g0, b0) / 255;
  
  return {
    r: Math.min(Math.round(r0 / a), 255),
    g: Math.min(Math.round(g0 / a), 255),
    b: Math.min(Math.round(b0 / a), 255),
    a: a * 100
  };
}

/**
 * RGB - BG → RGBA
 */
export default function RgbToRgba(): ReactElement {
  const [stateRgb, setStateRgb] = useState<Rgb>({
    r: 160,
    g: 20,
    b: 160
  });
  const extractedRgbaColorBasedOnWhite = useMemo((): string => {
    const {
      r,
      g,
      b
    } = stateRgb;
    
    return toString(extractRgbaColorBasedOnWhite(r, g, b));
  }, [stateRgb]);
  const extractedRgbaColorBasedOnBlack = useMemo((): string => {
    const {
      r,
      g,
      b
    } = stateRgb;
    
    return toString(extractRgbaColorBasedOnBlack(r, g, b));
  }, [stateRgb]);
  
  return <>
    <H2>RGB - #fff/#000 → rgba</H2>
    <P>设：纯色 <code>R + G + B</code> - 背景色 <code>#fff</code>（任意色有些难...），提取透明色 <code>r + g + b + a</code>。</P>
    <ScColorMix>
      <InputColor value={stateRgb} onChange={setStateRgb} />
      <ScSign>-</ScSign>
      <ScSign>#fff</ScSign>
      <ScSign>=</ScSign>
      <ScSign style={{
        backgroundColor: extractedRgbaColorBasedOnWhite,
        color: a11yReadableColor(extractedRgbaColorBasedOnWhite)
      }}>{extractedRgbaColorBasedOnWhite.toString()}</ScSign></ScColorMix>
    <ScColorMix style={{
      background: '#000'
    }}>
      <InputColor value={stateRgb} onChange={setStateRgb} />
      <ScSign>-</ScSign>
      <ScSign>#000</ScSign>
      <ScSign>=</ScSign>
      <ScSign style={{
        backgroundColor: extractedRgbaColorBasedOnBlack,
        color: a11yReadableColor(extractedRgbaColorBasedOnBlack)
      }}>{extractedRgbaColorBasedOnBlack.toString()}</ScSign></ScColorMix></>;
}
