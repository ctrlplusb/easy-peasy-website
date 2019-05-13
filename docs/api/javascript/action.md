---
id: action
title: action
---

Declares an action on your model. An action allows you to perform updates on your store.

The action will have access to the part of the state tree where it was defined.

## Arguments

- `action` (Function, required)

  The action definition. It receives the following arguments:

  - `state` (Object, required)

    The part of the state tree that the action is against. You can mutate this state value directly as required by the action. Under the hood we convert these mutations into an update against the Redux store.

  - `payload` (Any)

    The payload, if any, that was provided to the action.

When your model is processed by Easy Peasy to create your store all of your actions will be made available against the store's `dispatch`. They are mapped to the same path as they were defined in your model. You can then simply call the action functions providing any required payload.  See the example below.

---

## Example

```javascript
import { action, createStore } from 'easy-peasy';

const store = createStore({
  todos: {
    items: [],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
});

store.dispatch.todos.add('Install easy-peasy');
```
