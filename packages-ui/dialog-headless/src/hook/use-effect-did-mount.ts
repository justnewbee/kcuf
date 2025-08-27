import {
  useState,
  useEffect
} from 'react';

import useDispatchSetActive from './use-dispatch-set-active';

// TODO use transition-group
export default function useEffectDidMount(): void {
  const dispatchToggleActive = useDispatchSetActive();
  const [stateDidMount, setStateDidMount] = useState<boolean>(false);
  
  useEffect(() => {
    if (!stateDidMount) {
      setStateDidMount(true);
      
      window.setTimeout(() => { // 触发 CSS 动画
        dispatchToggleActive(true);
      }, 10);
    }
  }, [stateDidMount, dispatchToggleActive]);
}
