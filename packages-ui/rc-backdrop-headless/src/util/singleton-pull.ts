import singletonGlobal from './singleton-global';
import messageBroadcastRefresh from './message-broadcast-refresh';
import toggleScrollbar from './toggle-scrollbar';

export default function singletonPull(n: number): void {
  const g = singletonGlobal();
  const {
    items
  } = g;
  
  if (!items?.length) {
    return;
  }
  
  const index = items.findIndex(v => v.n === n);
  
  if (index >= 0) {
    items.splice(index, 1);
    
    if (!items.length) {
      g.n = 0;
      
      toggleScrollbar(true);
    }
    
    messageBroadcastRefresh(n);
  }
}
