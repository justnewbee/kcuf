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
  CompareManipulationGrayscale,
  CompareManipulationRotate,
  CompareManipulationDesaturate,
  CompareManipulationSaturate,
  CompareManipulationDarken,
  CompareManipulationLighten,
  CompareManipulationShade,
  CompareManipulationTint,
  CompareManipulationInvert,
  CompareManipulationMix,
  CompareA11yLuminance,
  CompareA11yContrast
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
      {TITLES.map(v => <GridTitle key={v}>{v}</GridTitle>)}
      <CompareToStringHex />
      <CompareToStringRgb />
      <CompareToStringHsl />
      <CompareManipulationGrayscale />
      <CompareManipulationRotate />
      <CompareManipulationDesaturate />
      <CompareManipulationSaturate />
      <CompareManipulationDarken />
      <CompareManipulationLighten />
      <CompareManipulationShade />
      <CompareManipulationTint />
      <CompareManipulationInvert />
      <CompareManipulationMix />
      <CompareA11yLuminance />
      <CompareA11yContrast />
      <CompareA11yContrast black />
    </ScGrid>
  </>;
}
