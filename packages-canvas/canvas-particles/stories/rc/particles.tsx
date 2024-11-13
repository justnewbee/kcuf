import {
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import createParticles, {
  ParticlesConfig
} from '../../src';

const ScCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default function Particles(props: ParticlesConfig): ReactElement {
  const [stateDomCanvas, setStateDomCanvas] = useState<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!stateDomCanvas) {
      return;
    }
    
    const particles = createParticles(stateDomCanvas, props);
    
    return () => particles.destroy();
  }, [props, stateDomCanvas]);
  
  return <ScCanvas ref={setStateDomCanvas} />;
}
