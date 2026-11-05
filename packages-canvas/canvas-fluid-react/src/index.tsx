import {
  ReactElement,
  useRef,
  useEffect
} from 'react';

import CanvasFluid, {
  CanvasFluidConfig
} from '@kcuf/canvas-fluid';

interface ICanvasFluidProps extends CanvasFluidConfig {}

export default function CanvasFluidReact(props: ICanvasFluidProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) {
      return;
    }
    
    try {
      const canvasFluid = new CanvasFluid(canvas, props);
      
      return () => canvasFluid.destroy();
    } catch {
      // WebGL could be unavailable
    }
  }, [props]);
  
  return <canvas ref={canvasRef} />;
}

export type {
  ICanvasFluidProps as CanvasFluidProps
};
