---
id: thunk
title: thunk(action)
---

Declares a thunk action on your model. Allows you to perform effects such as data fetching and persisting.

## Arguments

- action (Function, required)

    The thunk action definition. A thunk typically encapsulates side effects (e.g. calls to an API). It can be asynchronous - i.e. use Promises or async/await. Thunk actions cannot modify state directly, however, they can dispatch other actions to do so.

    It receives the following arguments:

  - `actions` (required)

    The actions that are bound to same section of your model as the thunk. This allows you to dispatch another action to update state for example.

  - `payload` (Any, not required)

    The payload, if any, that was provided to the action.

  - `helpers` (Object, required)

    Contains a set of helpers which may be useful in advanced cases. The object contains the following properties:

    - `dispatch` (required)

    The Redux store `dispatch` instance. This will have all the Easy Peasy actions bound to it allowing you to dispatch additional actions.

    - `getState` (Function, required)

    When executed it will provide the local state of where the thunk is attached to your model. This can be useful in the cases where you require state in the execution of your thunk.

    - `getStoreState` (Function, required)

    When executed it will provide the root state of your model. This can be useful in the cases where you require state in the execution of your thunk.

    - `injections` (Any, not required, default=undefined)

    Any dependencies that were provided to the `createStore` configuration will be exposed as this argument. See the [`createStore`](#createstoremodel-config) docs on how to specify them.

    - `meta` (Object, required)

    This object contains meta information related to the effect. Specifically it contains the following properties:

      - parent (Array, string, required)

        An array representing the path of the parent to the action.

      - path (Array, string, required)

            An array representing the path to the action.

        This can be represented via the following example:

        ```javascript
        const store = createStore({
          products: {
            fetchById: thunk((dispatch, payload, { meta }) => {
              console.log(meta);
              // {
              //   parent: ['products'],
              //   path: ['products', 'fetchById']
              // }
            })
          }
        });
        ```

When your model is processed by Easy Peasy to create your store all of your thunk actions will be made available against the store's `dispatch`. They are mapped to the same path as they were defined in your model. You can then simply call the action functions providing any required payload.  See the examples below.

---

## Examples

```javascript
import { action, createStore, thunk } from 'easy-peasy'; // 👈 import then helper

const store = createStore({
  session: {
    user: undefined,
    // 👇 define your thunk action
    login: thunk(async (actions, payload) => {
      const user = await loginService(payload)
      actions.loginSucceeded(user)
    }),
    loginSucceeded: action((state, payload) => {
      state.user = payload
    })
  }
});

// 👇 you can dispatch and await on the thunk action
store.dispatch.session.login({
  username: 'foo',
  password: 'bar'
})
// 👇 thunk actions _always_ return a Promise
.then(() => console.log('Logged in'));

```

---

### Accessing local state via the getState parameter

```javascript
import { createStore, thunk } from 'easy-peasy';

const store = createStore({
  counter: {
    count: 1,
    // getState allows you to gain access to the local state
    //                                               👇
    doSomething: thunk(async (dispatch, payload, { getState }) => {
      // Calling it exposes the local state. i.e. the part of state where the
      // thunk was attached
      //            👇
      console.log(getState())
      // { count: 1 }
    }),
  }
});

store.dispatch.doSomething()
```

---

### Accessing full state via the getStoreState parameter

```javascript
import { createStore, thunk } from 'easy-peasy';

const store = createStore({
  counter: {
    count: 1,
    // getStoreState allows you to gain access to the  store's state
    //                                               👇
    doSomething: thunk(async (dispatch, payload, { getStoreState }) => {
      // Calling it exposes the root state of your store. i.e. the full
      // store state 👇
      console.log(getStoreState())
      // { counter: { count: 1 } }
    }),
  }
});

store.dispatch.doSomething()
```

---

### Dispatching an action from another part of the model

```javascript
import { action, createStore, thunk } from 'easy-peasy';

const store = createStore({
  audit: {
    logs: [],
    add: action((state, payload) => {
      audit.logs.push(payload);
    })
  },
  todos: {
    // dispatch allows you to gain access to the store's dispatch
    //                                      👇
    saveTodo: thunk((actions, payload, { dispatch }) => {
      // ...
      dispatch.audit.add('Added a todo');
    })
  }
});

store.dispatch.todos.saveTodo('foo');
```

We don't recommned doing this, and instead encourage you to use the [`listen`](#listenon) helper to invert responsibilites. However, there may exceptional cases in which you need to do the above.

---

### With Dependency Injection

```javascript
import { createStore, thunk } from 'easy-peasy';
import api from './api' // 👈 a dependency we want to inject

const store = createStore(
  {
    foo: 'bar',
    //                       injections are exposed here 👇
    doSomething: thunk(async (dispatch, payload, { injections }) => {
      const { api } = injections
      await api.foo()
    }),
  },
  {
    // 👇 specify the injections parameter when creating your store
    injections: {
      api,
    }
  }
);

store.dispatch.doSomething()
```
