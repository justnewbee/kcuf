import {
  ReactElement
} from 'react';

import {
  InputCheckbox
} from '@kcuf/demo-rc';

import {
  useOptionDebugEvents,
  useOptionNoHover,
  useOptionNoClick,
  useOptionNoSelect,
  useOptionNoEdit,
  useOptionNoEditDragInsertion,
  useOptionNoEditDragPoint,
  useOptionNoEditDragWhole,
  useOptionNoDelete,
  useOptionNoEditRemovePoint,
  useOptionNoCrossingDetection
} from '../../model';

export default function OpsOptions(): ReactElement {
  const [optionDebugEvents, setOptionDebugEvents] = useOptionDebugEvents();
  const [optionNoHover, setOptionNoHover] = useOptionNoHover();
  const [optionNoClick, setOptionNoClick] = useOptionNoClick();
  const [optionNoSelect, setOptionNoSelect] = useOptionNoSelect();
  const [optionNoEdit, setOptionNoEdit] = useOptionNoEdit();
  const [optionNoEditDragInsertion, setOptionNoEditDragInsertion] = useOptionNoEditDragInsertion();
  const [optionNoEditDragPoint, setOptionNoEditDragPoint] = useOptionNoEditDragPoint();
  const [optionNoEditDragWhole, setOptionNoEditDragWhole] = useOptionNoEditDragWhole();
  const [optionNoEditRemovePoint, setOptionNoEditRemovePoint] = useOptionNoEditRemovePoint();
  const [optionNoDelete, setOptionNoDelete] = useOptionNoDelete();
  const [optionNoCrossingDetection, setOptionNoCrossingDetection] = useOptionNoCrossingDetection();
  
  return <>
    <InputCheckbox {...{
      label: 'debugEvents',
      checked: optionDebugEvents,
      onChange: setOptionDebugEvents
    }} />
    <InputCheckbox {...{
      label: 'noHover',
      checked: optionNoHover,
      onChange: setOptionNoHover
    }} />
    <InputCheckbox {...{
      label: 'noClick',
      checked: optionNoClick,
      onChange: setOptionNoClick
    }} />
    <InputCheckbox {...{
      label: 'noSelect',
      checked: optionNoSelect,
      onChange: setOptionNoSelect
    }} />
    <InputCheckbox {...{
      label: 'noEdit',
      checked: optionNoEdit,
      onChange: setOptionNoEdit
    }} />
    <InputCheckbox {...{
      label: 'noEditDragPoint',
      checked: optionNoEditDragPoint,
      onChange: setOptionNoEditDragPoint
    }} />
    <InputCheckbox {...{
      label: 'noEditDragInsertion',
      checked: optionNoEditDragInsertion,
      onChange: setOptionNoEditDragInsertion
    }} />
    <InputCheckbox {...{
      label: 'noEditDragWhole',
      checked: optionNoEditDragWhole,
      onChange: setOptionNoEditDragWhole
    }} />
    <InputCheckbox {...{
      label: 'noEditRemovePoint',
      checked: optionNoEditRemovePoint,
      onChange: setOptionNoEditRemovePoint
    }} />
    <InputCheckbox {...{
      label: 'noDelete',
      checked: optionNoDelete,
      onChange: setOptionNoDelete
    }} />
    <InputCheckbox {...{
      label: 'noCrossingDetection',
      checked: optionNoCrossingDetection,
      onChange: setOptionNoCrossingDetection
    }} />
  </>;
}
