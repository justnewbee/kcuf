import {
  ReactElement,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

const ScKeyboardEventDetails = styled.div`
  font-size: 11px;
  color: hsl(200 100% 50%);
  text-align: center;
  
  span {
    margin-left: 1em;
    opacity: 0.5;
    
    &:first-child {
      margin-left: 0;
    }
  }
`;

export default function KeyboardEventDetails(): ReactElement | null {
  const [stateE, setStateE] = useState<KeyboardEvent | null>(null);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    function onKeydown(e: KeyboardEvent): void {
      if (timer) {
        clearTimeout(timer);
      }
      
      setStateE(e);
      
      timer = setTimeout(() => {
        setStateE(null);
      }, 3000);
    }
    
    document.addEventListener('keydown', onKeydown);
    
    return () => {
      document.removeEventListener('keydown', onKeydown);
      
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [setStateE]);
  
  return stateE ? <ScKeyboardEventDetails>
    <div>
      {stateE.ctrlKey ? <>⌃</> : null}
      {stateE.altKey ? <>⌥</> : null}
      {stateE.shiftKey ? <>⇧</> : null}
      {stateE.metaKey ? <>⌘</> : null}
    </div>
    <span>key</span> <>{stateE.key === ' ' ? '␣' : stateE.key}</>
    <span>code</span> <>{stateE.code}</>
    <span>keyCode</span> <>{stateE.keyCode}</>
  </ScKeyboardEventDetails> : null;
}