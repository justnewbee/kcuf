import {
  ReactElement,
  useRef,
  useEffect
} from 'react';

import CanvasFluid from '../src';

export default function StoryDefault(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const canvasFluid = new CanvasFluid(canvasRef.current);
    
    return (): void => canvasFluid.destroy();
  }, []);
  
  return <canvas ref={canvasRef} />;
}
