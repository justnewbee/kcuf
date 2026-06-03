import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import {
  H1,
  Button
} from '@kcuf/demo-rc';

import FilePicker, {
  FileItem
} from '../src';

export default function StoryDefault(): ReactElement {
  const [stateFileItems, setStateFileItems] = useState<FileItem[]>([]);
  
  const handleChange = useCallback((fileItems: FileItem[]) => {
    setStateFileItems(prevState => [...prevState, ...fileItems]);
  }, []);
  
  return <>
    <H1>基础用法</H1>
    <FilePicker onChange={handleChange} />
    <FilePicker onChange={handleChange}>
      <Button>Test</Button>
    </FilePicker>
    <FilePicker accept="image/*" onChange={handleChange}>
      <Button>图片</Button>
    </FilePicker>
    <div>
      {stateFileItems.map(v => <div key={v.id}>
        {v.id} - {v.file.name} - {v.file.type} - {v.file.size}
      </div>)}
    </div>
  </>;
}
