import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  Button,
  InputColor,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  pathCircle,
  pathTriangle,
  pathSquare,
  pathDiamond,
  pathPentagon,
  pathHexagon,
  pathPolygon,
  pathStar
} from '../src';

const CANVAS_W = 600;
const CANVAS_H = 400;
const CENTER: [number, number] = [CANVAS_W / 2, CANVAS_H / 2];
const RADIUS = CANVAS_H / 4;

const ScCanvas = styled.canvas`
  border: 1px solid #ccc;
  width: ${CANVAS_W}px;
  height: ${CANVAS_H}px;
`;
const ScSettings = styled.div`
  margin: 8px 0;
`;

export default function StoryPath(): ReactElement {
  const [stateCanvas, setStateCanvas] = useState<HTMLCanvasElement | null>(null);
  const [stateCanvasContext, setStateCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [stateStroke, setStateStroke] = useState(true);
  const [stateStrokeSize, setStateStrokeSize] = useState(2);
  const [stateStrokeColor, setStateStrokeColor] = useState('#666');
  const [stateFill, setStateFill] = useState(false);
  const [stateFillColor, setStateFillColor] = useState('#f88');
  
  const handleClear = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    stateCanvasContext.clearRect(0, 0, CANVAS_W, CANVAS_H);
  }, [stateCanvasContext]);
  
  const handleDraw = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    stateCanvasContext.lineWidth = stateStrokeSize;
    stateCanvasContext.lineCap = 'round';
    stateCanvasContext.strokeStyle = stateStrokeColor;
    stateCanvasContext.fillStyle = stateFillColor;
    
    if (stateStroke) {
      stateCanvasContext.stroke();
    }
    
    if (stateFill) {
      stateCanvasContext.fill();
    }
  }, [stateCanvasContext, stateStroke, stateStrokeSize, stateStrokeColor, stateFill, stateFillColor]);
  
  const handleDrawCircle = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathCircle(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawTriangle = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathTriangle(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawSquare = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathSquare(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawDiamond = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathDiamond(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawPentagon = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathPentagon(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawHexagon = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathHexagon(stateCanvasContext, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawPolygon5 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathPolygon(stateCanvasContext, 5, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawPolygon6 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathPolygon(stateCanvasContext, 6, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawPolygon7 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathPolygon(stateCanvasContext, 7, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawStar4 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathStar(stateCanvasContext, 4, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawStar5 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathStar(stateCanvasContext, 5, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawStar6 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathStar(stateCanvasContext, 6, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  const handleDrawStar7 = useCallback(() => {
    if (!stateCanvasContext) {
      return;
    }
    
    pathStar(stateCanvasContext, 7, CENTER, RADIUS);
    handleDraw();
  }, [stateCanvasContext, handleDraw]);
  
  useEffect(() => {
    if (!stateCanvas) {
      return;
    }
    
    setStateCanvasContext(stateCanvas.getContext('2d'));
  }, [stateCanvas]);
  
  return <>
    <div>
      <ScCanvas ref={setStateCanvas} width={CANVAS_W} height={CANVAS_H} />
    </div>
    <ScSettings>
      <InputSwitch {...{
        label: 'Stroke',
        value: stateStroke,
        onChange: setStateStroke
      }} />
      <InputNumber {...{
        value: stateStrokeSize,
        onChange: setStateStrokeSize
      }} />
      <InputColor {...{
        value: stateStrokeColor,
        onChange: setStateStrokeColor
      }} />
      <InputSwitch {...{
        label: 'Fill',
        value: stateFill,
        onChange: setStateFill
      }} />
      <InputColor {...{
        value: stateFillColor,
        onChange: setStateFillColor
      }} />
    </ScSettings>
    <Button onClick={handleClear}>Clear</Button>
    <Button onClick={handleDrawCircle}>Circle</Button>
    <Button onClick={handleDrawTriangle}>Triangle</Button>
    <Button onClick={handleDrawSquare}>Square</Button>
    <Button onClick={handleDrawDiamond}>Diamond</Button>
    <Button onClick={handleDrawPentagon}>Pentagon</Button>
    <Button onClick={handleDrawHexagon}>Hexagon</Button>
    <Button onClick={handleDrawPolygon5}>Polygon5</Button>
    <Button onClick={handleDrawPolygon6}>Polygon6</Button>
    <Button onClick={handleDrawPolygon7}>Polygon7</Button>
    <Button onClick={handleDrawStar4}>Star4</Button>
    <Button onClick={handleDrawStar5}>Star5</Button>
    <Button onClick={handleDrawStar6}>Star6</Button>
    <Button onClick={handleDrawStar7}>Star7</Button>
  </>;
}
