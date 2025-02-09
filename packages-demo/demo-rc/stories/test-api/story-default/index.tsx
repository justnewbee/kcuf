import {
  ReactElement
} from 'react';

import {
  InputText,
  TestApi
} from '../../../src';

export default function StoryDefault(): ReactElement {
  return <TestApi {...{
    title: 'Api 作用',
    name: 'dataApiName',
    type: 'DataApiReturnType',
    formItems: [{
      label: 'someId',
      content: <InputText />
    }],
    test: () => Promise.resolve('mocked api')
  }} />;
}
