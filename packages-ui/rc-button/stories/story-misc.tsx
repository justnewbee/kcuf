import {
  ReactElement,
  useState
} from 'react';

import {
  H2
} from '@kcuf/demo-rc';
import Icon from '@kcuf-ui/rc-icon';

import Button, {
  ButtonPreset
} from '../src';

export default function StoryMisc(): ReactElement {
  const [stateDom, setStateDom] = useState<HTMLElement | null>(null);
  
  return <>
    <H2>Ref Works Right</H2>
    <Button {...{
      ref: setStateDom,
      label: 'ref shall work right',
      preset: ButtonPreset.PRIMARY,
      onClick() {
        // eslint-disable-next-line no-console
        console.info(stateDom);
      }
    }} />
    <H2>垂直对齐 IconStart / IconEnd</H2>
    <Button {...{
      iconStart: ' ',
      textAlign: 'l',
      label: 'icon left NONE'
    }} />
    <br />
    <Button {...{
      iconStart: <Icon type="search" />,
      textAlign: 'l',
      label: 'icon left search'
    }} />
    <br />
    <Button {...{
      iconStart: ' ',
      iconEnd: <Icon type="arrowhead" />,
      textAlign: 'l',
      label: 'icon right arrowhead'
    }} />
    <H2>Loading</H2>
    <Button loading>Loading</Button>
    <H2>Ellipsis</H2>
    <div style={{ border: '1px solid red', width: '200px' }}>
      <Button>a normal button will ellipsis no matter what</Button>
      <Button loading>a loading button will ellipsis too</Button>
      <Button iconStart={<Icon type="search" />}>a button with icon will ellipsis too</Button>
      <Button iconEnd={<Icon type="search" />}>a button with icon will ellipsis too</Button>
      <Button iconStart={<Icon type="search" />} iconEnd={<Icon type="search" />}>a button with icon will ellipsis too</Button></div>
    <Button fluid>a fluid button will ellipsis too nevertheless, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, architecto aut debitis delectus dignissimos distinctio dolores doloribus excepturi fugit inventore ipsa iste quod repellat rerum sapiente sequi soluta sunt velit!</Button>
    <H2>fluid & text-align</H2>
    <Button fluid textAlign="l">textAlign: l</Button>
    <Button fluid textAlign="c">textAlign: c</Button>
    <Button fluid textAlign="r">textAlign: r</Button></>;
}
