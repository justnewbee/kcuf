import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';

import {
  pixelRatioGet,
  pixelRatioListen
} from '../src';

const SIZE = 320;

export default function StoryPixelRatio(): ReactElement {
  const [statePixelRatio, setStatePixelRatio] = useState(pixelRatioGet);
  const [stateDomCanvas, setStateDomCanvas] = useState<HTMLCanvasElement | null>(null);
  
  const updatePixelRatio = useCallback(() => {
    setStatePixelRatio(pixelRatioGet());
  }, [setStatePixelRatio]);
  
  useEffect(() => {
    if (!stateDomCanvas) {
      return;
    }
    
    stateDomCanvas.style.width = `${SIZE}px`;
    stateDomCanvas.style.height = `${SIZE}px`;
    stateDomCanvas.width = Math.floor(SIZE * statePixelRatio);
    stateDomCanvas.height = Math.floor(SIZE * statePixelRatio);
    
    const ctx = stateDomCanvas.getContext('2d');
    
    if (ctx) {
      ctx.scale(statePixelRatio, statePixelRatio);
      ctx.fillStyle = 'hsl(120 80% 40%)';
      ctx.fillRect(0, 0, SIZE, SIZE);
      
      ctx.fillStyle = 'hsl(0 0% 100%)';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`devicePixelRatio = ${statePixelRatio}`, SIZE / 2, SIZE / 2);
    }
  }, [statePixelRatio, stateDomCanvas]);
  
  useEffect(() => {
    return pixelRatioListen(updatePixelRatio);
  }, [updatePixelRatio]);
  
  return <canvas ref={setStateDomCanvas} />;
}
