import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useMarkingStats,
  useHandleDeleteActiveItem,
  useHandleDeleteAllItems
} from '../../model';

export default function OpsDelete(): ReactElement {
  const markingStats = useMarkingStats();
  const handleDeleteActiveItem = useHandleDeleteActiveItem();
  const handleDeleteAllItems = useHandleDeleteAllItems();
  
  return <>
    <Button {...{
      disabled: !markingStats?.editing,
      onClick: handleDeleteActiveItem
    }}>删除</Button>
    <Button {...{
      disabled: !markingStats?.itemStatsList.length,
      onClick: handleDeleteAllItems
    }}>删除全部</Button>
  </>;
}
