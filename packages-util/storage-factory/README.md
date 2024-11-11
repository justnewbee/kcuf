# @kcuf/storage-factory

## Why

一般具体的业务对 storage 的态度是：只有一个，且类型明确。

## APIs

这是一个工厂方法，生产一个方法：

```ts
import storageFactory from '@kcuf/storage-factory';

interface IAccount {
  id: string;
  name: string;
  loggedTime: number;
}

const DEFAULT: IAccount = {
  id: '',
  name: '',
  loggedTime: -1
};

export default storageFactory<ISomeType>(SOME_KEY_CONST, DEFAULT); // 第三个参数可选，传 `true` 使用 `sessionStorage`
```

生产出的 `storage` 方法和给定的泛型 `T` 有关，因此你不会再写错：

```ts
import storage from 'your specific module or package'; // 假设你定义了一个模块或者写了一个包

storage(); // 返回 ISomeType

const {
  id
} = storage();

storage.update('id', '123');
storage.update({
  'id': '123',
  loggedTime: Date.now()
});

storage.update('id', 123); // 💥 值类型错误
storage.update('ID', '123'); // 💥 key 错误
storage.update({
  'id': 123, // 💥 值类型错误,
  loggedTIME: Date.now() // 💥 key 错误
});
```
