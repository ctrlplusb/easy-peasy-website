---
id: storeProvider
title: StoreProvider
---

Initialises your React application with the store so that your components will be able to consume and interact with the state via the `useStore` and `useActions` hooks.

## Example

```javascript
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model'

const store = createStore(model);

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)
```
