import {
  ReactElement,
  useCallback,
  useState
} from 'react';

import {
  Button,
  PromiseViewer
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [statePromise, setStatePromise] = useState<Promise<unknown> | null>(null);
  
  const handleMockPromise = useCallback(() => {
    setStatePromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.8) {
          resolve({
            status: 'success',
            code: 200,
            data: {
              hell: 'world'
            }
          });
        } else {
          const error = new Error('Blah blah...');
          
          error.name = 'MockError';
          
          reject(error);
        }
      }, Math.random() * 2000);
    }));
  }, [setStatePromise]);
  
  return <>
    <Button onClick={handleMockPromise}>Mock Promise</Button>
    <PromiseViewer promise={statePromise} />
  </>;
}
