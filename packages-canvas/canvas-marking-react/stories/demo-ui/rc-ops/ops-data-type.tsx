import {
  ReactElement
} from 'react';

import {
  ChoiceGroupRadio
} from '@kcuf/demo-rc';

import {
  DataType,
  DATASOURCE_DATA_TYPE,
  useDataType,
  useHandleSetDataType
} from '../../demo-model';

export default function OpsDataType(): ReactElement {
  const dataType = useDataType();
  const handleSetDataType = useHandleSetDataType();
  
  return <ChoiceGroupRadio<DataType> {...{
    datasource: DATASOURCE_DATA_TYPE,
    value: dataType,
    onChange: handleSetDataType
  }} />;
}
