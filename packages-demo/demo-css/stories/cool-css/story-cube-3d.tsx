import {
  ReactElement,
  useState
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  ChoiceGroupRadio
} from '@kcuf/demo-rc';

enum ECubeFace {
  FRONT = 'front',
  RIGHT = 'right',
  BACK = 'back',
  LEFT = 'left',
  TOP = 'top',
  BOTTOM = 'bottom'
}

interface IScCubeProps {
  $face: ECubeFace;
}

const CUBE_FACES: ECubeFace[] = [
  ECubeFace.FRONT,
  ECubeFace.RIGHT,
  ECubeFace.BACK,
  ECubeFace.LEFT,
  ECubeFace.TOP,
  ECubeFace.BOTTOM
];

const ScCubeWrapper = styled.div`
  margin: 80px;
  width: 200px;
  height: 200px;
  perspective: 400px;
`;

const ScCube = styled.div<IScCubeProps>`
  position: relative;
  width: 200px;
  height: 200px;
  transform: translateZ(-100px);
  transform-style: preserve-3d;
  transition: transform 1s;
  
  ${props => {
    switch (props.$face) {
    case ECubeFace.RIGHT:
      return css`transform: translateZ(-100px) rotateY(-90deg);`;
    case ECubeFace.BACK:
      return css`transform: translateZ(-100px) rotateY(-180deg);`;
    case ECubeFace.LEFT:
      return css`transform: translateZ(-100px) rotateY(90deg);`;
    case ECubeFace.TOP:
      return css`transform: translateZ(-100px) rotateX(-90deg);`;
    case ECubeFace.BOTTOM:
      return css`transform: translateZ(-100px) rotateX(90deg);`;
    default:
      return css`transform: translateZ(-100px) rotateY(0deg);`;
    }
  }}
`;

const ScCubeFace = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid #2c3e50;
  box-sizing: border-box;
  color: white;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
  
  &[data-face="front"] {
    background: hsl(0 100% 50% / 70%);
    transform: rotateY(  0deg) translateZ(100px);
  }
  
  &[data-face="right"] {
    background: hsl(60 100% 50% / 70%);
    transform: rotateY( 90deg) translateZ(100px);
  }
  
  &[data-face="back"] {
    background: hsl(120 100% 50% / 70%);
    transform: rotateY(180deg) translateZ(100px);
  }
  
  &[data-face="left"] {
    background: hsl(180 100% 50% / 70%);
    transform: rotateY(-90deg) translateZ(100px);
  }
  
  &[data-face="top"] {
    background: hsl(240 100% 50% / 70%);
    transform: rotateX( 90deg) translateZ(100px);
  }
  
  &[data-face="bottom"] {
    background: hsl(300 100% 50% / 70%);
    transform: rotateX(-90deg) translateZ(100px);
  }
`;

// 参考自 https://3dtransforms.desandro.com/cube
export default function StoryCube3d(): ReactElement {
  const [stateFace, setStateFace] = useState<ECubeFace>(ECubeFace.FRONT);
  
  return <>
    <ScCubeWrapper>
      <ScCube $face={stateFace}>
        <ScCubeFace data-face="front">front</ScCubeFace>
        <ScCubeFace data-face="back">back</ScCubeFace>
        <ScCubeFace data-face="right">right</ScCubeFace>
        <ScCubeFace data-face="left">left</ScCubeFace>
        <ScCubeFace data-face="top">top</ScCubeFace>
        <ScCubeFace data-face="bottom">bottom</ScCubeFace>
      </ScCube>
    </ScCubeWrapper>
    <ChoiceGroupRadio<ECubeFace> {...{
      datasource: CUBE_FACES.map(v => ({
        label: v,
        value: v
      })),
      value: stateFace,
      onChange: setStateFace
    }} />
  </>;
}
