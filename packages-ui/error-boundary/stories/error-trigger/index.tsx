import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  H3,
  P
} from '@kcuf/demo-rc';

interface IUserInfo {
  name: string;
}

const ScErrorTrigger = styled.div`
  padding: 20px;
`;
const ScButton = styled.button`
  margin-right: 12px;
  padding: 5px 10px;
  border: none;
`;
const ScButtonError = styled(ScButton)`
  background-color: hsl(0 100% 65%);
  color: hsl(0 0% 100%);
`;
const ScTip = styled.p`
  margin-top: 10px;
  color: hsl(0 0% 40%);
`;

export default function ErrorTrigger(): ReactElement {
  const [stateStep, setStateStep] = useState(0);
  const [stateUser, setStateUser] = useState<IUserInfo>({
    name: '初始用户'
  });
  const [stateWillError, setStateWillError] = useState(false);
  
  const handleUpdate = useCallback(() => {
    setStateStep(prev => prev + 1);
    setStateUser(prev => ({
      ...prev,
      name: `用户 ${stateStep + 1}`
    }));
  }, [stateStep, setStateStep, setStateUser]);
  const handleUpdateNormal = useCallback(() => {
    setStateWillError(false);
    handleUpdate();
  }, [setStateWillError, handleUpdate]);
  const handleUpdateAbnormal = useCallback(() => {
    setStateWillError(true);
    handleUpdate();
  }, [setStateWillError, handleUpdate]);
  
  useEffect(() => {
    if (stateWillError && stateStep % 3 === 0) { // 故意访问不存在的属性，导致运行时错误
      console.info((stateStep as unknown as IUserInfo).name.length); // eslint-disable-line no-console
    }
  }, [stateWillError, stateStep]);
  
  return <ScErrorTrigger>
    <H3>错误触发测试组件</H3>
    <P>当前步骤：{stateStep}</P>
    <P>当前用户：{stateUser.name}</P>
    <div>
      <ScButton onClick={handleUpdateNormal}>正常更新（不会出错）</ScButton>
      <ScButtonError onClick={handleUpdateAbnormal}>点击更新（第 3n 次触发错误）</ScButtonError>
      <ScTip>说明：红色按钮 3 的倍数次点击触发运行时错误</ScTip>
    </div>
  </ScErrorTrigger>;
}
