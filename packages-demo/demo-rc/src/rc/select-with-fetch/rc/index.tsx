import {
  ReactElement,
  forwardRef,
  useState,
  useEffect
} from 'react';

import {
  IDatasourceItem
} from '../../../types';
import Select from '../../select';
import {
  TSelectWithFetchRef,
  ISelectWithFetchProps
} from '../types';

function SelectWithFetch({
  fetchDatasource,
  ...props
}: ISelectWithFetchProps, ref: TSelectWithFetchRef): ReactElement {
  const [stateDatasource, setStateDatasource] = useState<IDatasourceItem[]>([]);
  
  useEffect(() => {
    fetchDatasource().then(setStateDatasource);
  }, [fetchDatasource, setStateDatasource]);
  
  return <Select {...props} datasource={stateDatasource} ref={ref} />;
}

export default forwardRef(SelectWithFetch);
