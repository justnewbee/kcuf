import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import {
  H1,
  Button,
  CodeViewerJson5,
  Table
} from '@kcuf/demo-rc';

import {
  CookieSetOptions,
  cookieAll,
  cookieGet,
  cookieSet,
  cookieDelete
} from '../src';

interface ITestItem {
  name: string;
  value: string;
  valueGet: string | undefined;
  sameSite: CookieSetOptions['sameSite'];
  secure: CookieSetOptions['secure'];
}

const TEST_COOKIE = 'kcuf_cookie';
const ALL_COOKIES = cookieAll();
const ONE_COOKIE = cookieGet(TEST_COOKIE);

const SAME_SITES = [undefined, 'Lax', 'Strict', 'None'] as [undefined, CookieSetOptions['sameSite'], CookieSetOptions['sameSite'], CookieSetOptions['sameSite']];
const SECURES = [undefined, true, false];
const TIME = Date.now();

const TEST_ITEMS: ITestItem[] = SAME_SITES.reduce((result: ITestItem[], sameSite) => {
  SECURES.forEach(secure => {
    const name = `SameSite_${String(sameSite)}__Secure_${String(secure)}`;
    const value = `${String(sameSite)}_${String(secure)}_${TIME}`;
    
    cookieSet(name, value, {
      sameSite,
      secure
    });
    
    result.push({
      name,
      value,
      valueGet: cookieGet(name),
      sameSite,
      secure
    });
  });
  
  return result;
}, []);

export default function DemoDefault(): ReactElement {
  const [stateCookies, setStateCookies] = useState(ALL_COOKIES);
  const [stateOneCookie, setStateOneCookie] = useState(ONE_COOKIE);
  
  const handleRefreshAll = useCallback(() => setStateCookies(cookieAll()), [setStateCookies]);
  const handleRefreshOne = useCallback(() => setStateOneCookie(cookieGet(TEST_COOKIE)), [setStateOneCookie]);
  
  const handleSetCookie = useCallback(() => {
    cookieSet(TEST_COOKIE, new Date().toISOString());
    handleRefreshAll();
    handleRefreshOne();
  }, [handleRefreshAll, handleRefreshOne]);
  const handleDeleteCookie = useCallback(() => {
    cookieDelete(TEST_COOKIE);
    handleRefreshAll();
    handleRefreshOne();
  }, [handleRefreshAll, handleRefreshOne]);
  
  return <>
    <H1>全部 Cookie</H1>
    <Button onClick={handleDeleteCookie}>{`cookieDelete('${TEST_COOKIE}')`}</Button>
    <Button onClick={handleSetCookie}>{`cookieSet('${TEST_COOKIE}') → cookieGet('${TEST_COOKIE}') → ${String(stateOneCookie)}`}</Button>
    <CodeViewerJson5 o={stateCookies} />
    <Table<ITestItem> {...{
      datasource: TEST_ITEMS,
      columns: [{
        title: 'Cookie',
        dataIndex: 'name'
      }, {
        title: 'SameSite',
        dataIndex: 'sameSite'
      }, {
        title: 'Secure',
        dataIndex: 'secure'
      }, {
        title: '设置值',
        dataIndex: 'value'
      }, {
        title: '获取值',
        dataIndex: 'valueGet'
      }, {
        title: '结果',
        renderCell: o => o.value === o.valueGet ? <span>✅</span> : <span>❌</span>
      }]
    }} />
  </>;
}
