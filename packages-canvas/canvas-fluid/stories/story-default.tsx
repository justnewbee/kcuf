import {
  ReactElement,
  useRef,
  useEffect
} from 'react';

import canvasFluid from '../src';

export default function StoryDefault(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const fluid = canvasFluid(canvasRef.current);
    
    return (): void => fluid.destroy();
  }, []);
  
  return <canvas ref={canvasRef} />;
}
