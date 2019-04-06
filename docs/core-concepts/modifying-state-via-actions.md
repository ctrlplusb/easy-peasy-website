---
id: modifying-state-via-actions
title: Modifying state via actions
---

In order to mutate your state you need to define an action against your model.

```javascript
import { action } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  todos: {
    items: [],
    //         👇 define the action with the helper
    addTodo: action((state, payload) => {
      // Mutate the state directly. Under the hood we convert this to an
      // an immutable update.
      state.items.push(payload)
    })
  }
});
```

The action will receive as its first parameter the slice of the state that it was added to. So in the example above our action would receive `{ items: [] }` as the value for its `state` argument. It will also receive any `payload` that may have been provided when the action was triggered.

> Note: Some prefer not to use a mutation based API. You can alternatively return new instances of your state:
>
> ```javascript
> addTodo: action((state, payload) => {
>   return { ...state, items: [...state.items, payload] };
> })
> ```
>
> Personally I find the above harder to read and more prone to error.
