---
id: creating-a-thunk-action
title: Creating a thunk Action
---

If you wish to perform side effects, such as fetching or persisting data from your server then you can use the `thunk` helper to declare a thunk action.

```javascript
import { thunk } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  todos: {
    items: [],

    //          👇 define a thunk action via the helper
    saveTodo: thunk(async (actions, payload) => {
      //                      👆
      // Notice that the thunk will receive the actions allowing you to dispatch
      // other actions after you have performed your side effect.
      const saved = await todoService.save(payload);
      // Now we dispatch an action to add the saved item to our state
      //         👇
      actions.todoSaved(saved);
    }),

    todoSaved: action((state, payload) => {
      state.items.push(payload)
    })
  }
});
```

You cannot modify the state within a `thunk`, however, the `thunk` is provided the `actions` that are local to it. This allows you to delegate state updates via your actions (an experience similar to that of `redux-thunk`).
