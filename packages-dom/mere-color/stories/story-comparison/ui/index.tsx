import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  TITLES
} from './const';
import {
  GridTitle,
  ColorInput,
  CompareToStringHex,
  CompareToStringRgb,
  CompareToStringHsl,
  CompareGenerateRandom,
  CompareGenerateGrayscale,
  CompareGenerateRotate,
  CompareGenerateDesaturate,
  CompareGenerateSaturate,
  CompareGenerateDarken,
  CompareGenerateLighten,
  CompareGenerateShade,
  CompareGenerateTint,
  CompareGenerateInvert,
  CompareGenerateMix,
  CompareA11yBrightness,
  CompareA11yLuminance,
  CompareA11yContrast,
  CompareIsEqual,
  CompareIsDark,
  CompareIsLight
} from './rc';

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${TITLES.length}, 1fr);
  gap: 4px;
`;

export default function Ui(): ReactElement {
  return <>
    <ColorInput />
    <ScGrid>
      {TITLES.map(v => <GridTitle key={v.name}>{v.url ? <a href={v.url} target="_blank" rel="noreferrer">{v.name}</a> : v.name}</GridTitle>)}
      <CompareToStringHex />
      <CompareToStringRgb />
      <CompareToStringHsl />
      <CompareGenerateRandom />
      <CompareGenerateGrayscale />
      <CompareGenerateRotate />
      <CompareGenerateDesaturate />
      <CompareGenerateSaturate />
      <CompareGenerateDarken />
      <CompareGenerateLighten />
      <CompareGenerateShade />
      <CompareGenerateTint />
      <CompareGenerateInvert />
      <CompareGenerateMix />
      <CompareA11yBrightness />
      <CompareA11yLuminance />
      <CompareA11yContrast />
      <CompareA11yContrast black />
      <CompareIsEqual />
      <CompareIsDark />
      <CompareIsLight /></ScGrid></>;
}
