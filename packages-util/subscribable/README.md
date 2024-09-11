# @kcuf/subscribable

> A fully typed sub-pub class.

## How to Use

1. Use as Object
2. Use as class Base

### Use as Object

```ts
const subscribable = new Subscribable<TNamedCallbacks>();

subscribable.on(...);

subscribable.emit(...);
```

### Use as class Base

```ts
class MyClass extends Subscribable<TNamedCallbacks> {
  fn() {
    this.emit(...);
  }
}

const myClass = new MyClass();

myClass.on(...);

myClass.offAll();
```

## APIs

### Generic

When using TS, you can reinforce the topic and callback relationship by providing `Subscribable` a generic type.

```ts
Subscribable<TNamedCallbacks>
```

> Just remember to use `type` instead of `interface`, or TS will complain about not satisfying constraints.

### `on`

Subscribe to a topic.

```ts
subscribable.on({...});

subscribable.on('topic', callback);
```

### `off`

NOT provided, use the return non-arguments function to unsubscribe. For example, in a React `useEffect`:

```ts
import {
  useEffect
} from 'react';

export default useEffectSubscribe(): void {
  ...
    
  useEffect(() => {
    return subscribable.on(...); // return off function `() => void`
  }, [...]);
}
```

### `offAll`

Useful when you want to do some cleanups before destroy the subscribable.

```ts
subscribable.offAll();
```

## Example

> The example uses `Subscribable` as an object, it is quite similar using it as base class.

```ts
interface IData {
  id: string;
  value: number;
}

type TNamedCallbacks = { // Use type instead of interface
  'login': (username: string) => void;
  'logout': (username: string) => void;
  'data-update': (data: IData) => void;
};

const subscribable = new Subscribable<TNamedCallbacks>();

// Works 👍
subscribable.on('login', (username: string): void => {
  console.info(username); // eslint-disable-line no-console
});

// Not work 💥 - arguments wrong
subscribable.on('login', (username: string, age: number): void => {
  console.info(username, age); // eslint-disable-line no-console
});

// Not work 💥 - topic wrong
subscribable.on('logon', (username: string): void => {
  console.info(username); // eslint-disable-line no-console
});

// Works 👍 - in batch mode
subscribable.on({
  login(username: string): void {
    console.info(username); // eslint-disable-line no-console
  },
  'data-update': (data: IData) => {
    console.info(data); // eslint-disable-line no-console
  }
});

// Works 👍
subscribable.emit('login', 'John Doe');
subscribable.emit('data-update', {
  id: '123',
  value: 42
});

// Not work 💥
subscribable.emit('logon', 'John Doe');
subscribable.emit('login', 'John Doe', 12);
subscribable.emit('data-update', {
  id: '123',
  value: true
});
```