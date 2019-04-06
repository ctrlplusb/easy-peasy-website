---
id: with-react-native
title: With React Native
---

Easy Peasy is platform agnostic but makes use of features that may not be available in all environments.

## How to enable remote Redux dev tools

React Native, hybrid, desktop and server side Redux apps can use Redux Dev Tools using the [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) library.

To use this library, you will need to pass the DevTools compose helper as part of the [config object](#createstoremodel-config) to `createStore`

```javascript
import { createStore } from 'easy-peasy';
import { composeWithDevTools } from 'remote-redux-devtools';
import model from './model';

/**
 * model, is used for passing through the base model
 * the second argument takes an object for additional configuration
 */

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true })
  // initialState: {}
});

export default store;
```

See [https://github.com/zalmoxisus/remote-redux-devtools#parameters](https://github.com/zalmoxisus/remote-redux-devtools#parameters) for all configuration options.
