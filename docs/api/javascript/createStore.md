---
id: createStore
title:  createStore(model, config)
---

Creates a Redux store based on the given model. The model must be an object and can be any depth. It also accepts an optional configuration parameter for customisations.

## Arguments

  - `model` (Object, required)

    Your model representing your state tree, and optionally containing action functions.

  - `config` (Object, not required)

    Provides custom configuration options for your store. It supports the following options:

    - `compose` (Function, not required, default=undefined)

       Custom [`compose`](https://redux.js.org/api/compose) function that will be used in place of the one from Redux or Redux Dev Tools. This is especially useful in the context of React Native and other environments. See the Usage with React Native notes.

    - `devTools` (bool, not required, default=true)

       Setting this to `true` will enable the [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

    - `disableInternalSelectFnMemoize` (bool, not required, default=false)

      Setting this to `true` will disable the automatic memoisation of a fn that you may return in any of your [`select`](#selectselector) implementations. Please see the [`select`](#selectselector) documentation for more information.

    - `enhancers` (Array, not required, default=[])

      Any custom [store enhancers](https://redux.js.org/glossary#store-enhancer) you would like to apply to your Redux store.

    - `initialState` (Object, not required, default=undefined)

      Allows you to hydrate your store with initial state (for example state received from your server in a server rendering context).

    - `injections` (Any, not required, default=undefined)

      Any dependencies you would like to inject, making them available to your effect actions. They will become available as the 4th parameter to the effect handler. See the [effect](#effectaction) docs for more.

    - `middleware` (Array, not required, default=[])

      Any additional [middleware](https://redux.js.org/glossary#middleware) you would like to attach to your Redux store.

    - `mockActions` (boolean, not required, default=false)

      Useful when testing your store, especially in the context of thunks. When set to `true` none of the actions dispatched will update the state, they will be instead recorded and can be accessed via the `getMockedActions` API that is added to the store.  Please see the ["Writing Tests"](#writing-tests) section for more information.

    - `reducerEnhancer` (Function, not required, default=(reducer => reducer))

      Any additional reducerEnhancer you would like to enhance to your root reducer (for example you want to use [redux-persist](https://github.com/rt2zz/redux-persist)).

---

## Store Instance API

When you have created a store all the standard APIs of a [Redux Store](https://redux.js.org/api/store) are available. Please reference [their docs](https://redux.js.org/api/store) for more information. In addition to the standard APIs, Easy Peasy enhances the instance to contain the following:

  - `dispatch` (Function & Object, required)

    The Redux store `dispatch` behaves as normal, however, it also has the actions from your model directly mounted against it - allowing you to easily dispatch actions. Please see the docs on actions/thunks for examples.

  - `getMockedActions` (Function, required)

    When the `mockActions` configuration value was passed to the `createStore` then calling this function will return the actions that have been dispatched (and mocked). This is useful in the context of testing - especially thunks.

  - `clearMockedActions` (Function, required)

    When the `mockActions` configuration value was passed to the `createStore` then calling this function clears the list of mocked actions that have been tracked by the store. This is useful in the context of testing - especially thunks.

---

## Example

```javascript
import { createStore } from 'easy-peasy';

const store = createStore({
  todos: {
    items: [],
    addTodo: (state, text) => {
      state.items.push(text)
    }
  },
  session: {
    user: undefined,
  }
})
```