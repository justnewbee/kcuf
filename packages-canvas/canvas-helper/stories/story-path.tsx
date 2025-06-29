import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  Form,
  Button,
  InputColor,
  InputNumber,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  PathOptions,
  pathCircle,
  pathCross,
  pathDiamond,
  pathPentagon,
  pathHexagon,
  pathPolygon,
  pathSquare,
  pathStar,
  pathTriangle
} from '../src';

const CANVAS_W = 600;
const CANVAS_H = 400;
const CENTER: [number, number] = [CANVAS_W / 2, CANVAS_H / 2];
const RADIUS = CANVAS_H / 4;

const ScCanvas = styled.canvas`
  width: ${CANVAS_W}px;
  height: ${CANVAS_H}px;
  border: 1px solid #ccc;
`;

export default function StoryPath(): ReactElement {
  const [stateCanvas, setStateCanvas] = useState<HTMLCanvasElement | null>(null);
  const [stateCanvasContext, setStateCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [stateStroke, setStateStroke] = useState(true);
  const [stateStrokeSize, setStateStrokeSize] = useState(1);
  const [stateStrokeColor, setStateStrokeColor] = useState('#666');
  const [stateFill, setStateFill] = useState(false);
  const [stateFillColor, setStateFillColor] = useState('#f88');
  const [stateRotate, setStateRotate] = useState(true);
  const [stateRotateValue, setStateRotateValue] = useState(0);
  const [stateClear, setStateClear] = useState(true);
  
  const handleClear = useCallback(() => {
    stateCanvasContext?.clearRect(0, 0, CANVAS_W, CANVAS_H);
  }, [stateCanvasContext]);
  
  const handleDraw = useCallback((doPath: (ctx: CanvasRenderingContext2D, options: PathOptions) => void) => {
    if (!stateCanvasContext) {
      return;
    }
    
    if (stateClear) {
      handleClear();
    }
    
    doPath(stateCanvasContext, {
      center: CENTER,
      radius: RADIUS,
      rotate: stateRotate ? stateRotateValue : undefined
    });
    
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
    
    // 中心
    pathCross(stateCanvasContext, {
      center: CENTER,
      radius: 6
    });
    stateCanvasContext.lineWidth = 1;
    stateCanvasContext.strokeStyle = '#f00';
    stateCanvasContext.stroke();
  }, [stateCanvasContext, stateClear, stateRotate, stateRotateValue, stateStrokeSize, stateStrokeColor, stateFillColor, stateStroke, stateFill, handleClear]);
  
  const handleDrawCross = useCallback(() => {
    handleDraw(pathCross);
  }, [handleDraw]);
  
  const handleDrawCircle = useCallback(() => {
    handleDraw(pathCircle);
  }, [handleDraw]);
  
  const handleDrawTriangle = useCallback(() => {
    handleDraw(pathTriangle);
  }, [handleDraw]);
  
  const handleDrawSquare = useCallback(() => {
    handleDraw(pathSquare);
  }, [handleDraw]);
  
  const handleDrawDiamond = useCallback(() => {
    handleDraw(pathDiamond);
  }, [handleDraw]);
  
  const handleDrawPentagon = useCallback(() => {
    handleDraw(pathPentagon);
  }, [handleDraw]);
  
  const handleDrawHexagon = useCallback(() => {
    handleDraw(pathHexagon);
  }, [handleDraw]);
  
  const handleDrawPolygon7 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathPolygon(ctx, {
        ...options,
        vertices: 7
      });
    });
  }, [handleDraw]);
  
  const handleDrawPolygon8 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathPolygon(ctx, {
        ...options,
        vertices: 8
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar3 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 3
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar4 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 4
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar5 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 5
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar6 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 6
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar7 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 7
      });
    });
  }, [handleDraw]);
  
  const handleDrawStar8 = useCallback(() => {
    handleDraw((ctx, options) => {
      pathStar(ctx, {
        ...options,
        vertices: 8
      });
    });
  }, [handleDraw]);
  
  useEffect(() => {
    if (!stateCanvas) {
      return;
    }
    
    setStateCanvasContext(stateCanvas.getContext('2d'));
  }, [stateCanvas]);
  
  return <>
    <div>
      <ScCanvas ref={setStateCanvas} width={CANVAS_W} height={CANVAS_H} /></div>
    <Form {...{
      dense: true,
      items: [{
        label: 'Draw',
        content: <>
          <Button onClick={handleDrawCross}>Cross</Button>
          <Button onClick={handleDrawCircle}>Circle</Button>
          <Button onClick={handleDrawTriangle}>Triangle</Button>
          <Button onClick={handleDrawSquare}>Square</Button>
          <Button onClick={handleDrawDiamond}>Diamond</Button>
          <Button onClick={handleDrawPentagon}>Pentagon</Button>
          <Button onClick={handleDrawHexagon}>Hexagon</Button>
          <Button onClick={handleDrawPolygon7}>Polygon 7</Button>
          <Button onClick={handleDrawPolygon8}>Polygon 8</Button>
          <Button onClick={handleDrawStar3}>Star 3</Button>
          <Button onClick={handleDrawStar4}>Star 4</Button>
          <Button onClick={handleDrawStar5}>Star 5</Button>
          <Button onClick={handleDrawStar6}>Star 6</Button>
          <Button onClick={handleDrawStar7}>Star 7</Button>
          <Button onClick={handleDrawStar8}>Star 8</Button></>
      }, {
        label: 'Clear',
        content: <>
          <Button onClick={handleClear}>Clear</Button>
          <InputSwitch {...{
            label: 'Clear before draw',
            value: stateClear,
            onChange: setStateClear
          }} /></>
      }, {
        label: 'Stroke',
        content: <>
          <InputSwitch {...{
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
          }} /></>
      }, {
        label: 'Fill',
        content: <>
          <InputSwitch {...{
            value: stateFill,
            onChange: setStateFill
          }} />
          <InputColor {...{
            value: stateFillColor,
            onChange: setStateFillColor
          }} /></>
      }, {
        label: 'Rotate',
        content: <>
          <InputSwitch {...{
            value: stateRotate,
            onChange: setStateRotate
          }} />
          <InputNumber {...{
            value: stateRotateValue,
            onChange: setStateRotateValue
          }} /></>
      }]
    }} /></>;
}
