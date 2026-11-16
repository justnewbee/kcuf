import {
  ReactElement
} from 'react';

import {
  H2,
  SelectWithFetch
} from '../../src';

interface IPerson {
  id: string;
  name: string;
}

const PEOPLE: IPerson[] = [{
  id: '1',
  name: 'Alice'
}, {
  id: '2',
  name: 'Bob'
}, {
  id: '3',
  name: 'Catherine'
}];

export default function StoryDefault(): ReactElement {
  return <>
    <H2>成功</H2>
    <SelectWithFetch<IPerson> {...{
      fetchList: () => Promise.resolve(PEOPLE),
      optionLabel: 'name',
      optionValue: 'id',
      onChange: console.info, // eslint-disable-line no-console
      onChangeData: console.info // eslint-disable-line no-console
    }} />
    <H2>失败</H2>
    <SelectWithFetch<IPerson> {...{
      fetchList: () => Promise.reject(new Error('this is an Error object')),
      optionLabel: 'name',
      optionValue: 'id'
    }} />
    <SelectWithFetch<IPerson> {...{
      fetchList: () => Promise.reject('error string'), // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors
      optionLabel: 'name',
      optionValue: 'id'
    }} />
    <SelectWithFetch<IPerson> {...{
      fetchList: () => Promise.reject(), // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors
      optionLabel: 'name',
      optionValue: 'id'
    }} />
  </>;
}
