import {
  IPathOptions
} from '../types';

export default function createPathFn<O extends IPathOptions = IPathOptions>(pathFn: (canvasContext: CanvasRenderingContext2D, options: O) => void): (canvasContext: CanvasRenderingContext2D, options: O) => void {
  return (canvasContext: CanvasRenderingContext2D, options: O): void => {
    canvasContext.save();
    
    if (options.rotate) {
      canvasContext.translate(options.center[0], options.center[1]);
      canvasContext.rotate(options.rotate * Math.PI / 180);
      canvasContext.translate(-options.center[0], -options.center[1]);
    }
    
    pathFn(canvasContext, options);
    
    canvasContext.restore();
  };
}
