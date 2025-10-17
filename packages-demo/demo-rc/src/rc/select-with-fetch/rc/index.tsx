import {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';

import {
  IDatasourceItem
} from '../../../types';
import Select from '../../select';
import {
  ISelectWithFetchProps
} from '../types';

export default function SelectWithFetch<T extends object>({
  disabled,
  withEmpty,
  fetchList,
  optionLabel,
  optionValue,
  onFetchSuccess,
  onFetchError,
  onChange,
  onChangeData,
  ...props
}: ISelectWithFetchProps<T>): ReactElement {
  const [stateLoading, setStateLoading] = useState<boolean | 'error'>(false);
  const [stateList, setStateList] = useState<T[]>([]);
  const datasource = useMemo((): IDatasourceItem[] => {
    switch (stateLoading) {
    case true:
      return [{
        label: 'Loading...',
        value: ''
      }];
    case 'error':
      return [{
        label: 'Error',
        value: ''
      }];
    default:
      return stateList.map(v => ({
        label: typeof optionLabel === 'function' ? optionLabel(v) : v[optionLabel],
        value: typeof optionValue === 'function' ? optionValue(v) : v[optionValue]
      } as IDatasourceItem));
    }
  }, [stateLoading, stateList, optionLabel, optionValue]);
  
  const useHandleFetch = useCallback(async () => {
    setStateLoading(true);
    
    try {
      const list = await fetchList();
      
      setStateLoading(false);
      setStateList(list);
      onFetchSuccess?.(list);
    } catch (err) {
      setStateLoading('error');
      onFetchError?.(err as Error);
    }
  }, [fetchList, onFetchError, onFetchSuccess]);
  const handleChange = useCallback((value: string) => {
    onChange?.(value);
    
    onChangeData?.(stateList.find(v => {
      const itemValue = typeof optionValue === 'function' ? optionValue(v) : v[optionValue] as string;
      
      return itemValue === value;
    }));
  }, [stateList, optionValue, onChange, onChangeData]);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHandleFetch();
  }, [useHandleFetch]);
  
  return <Select {...{
    ...props,
    disabled: stateLoading === true ? true : disabled,
    withEmpty: stateLoading === false ? withEmpty : false,
    datasource,
    onChange: handleChange
  }} />;
}
