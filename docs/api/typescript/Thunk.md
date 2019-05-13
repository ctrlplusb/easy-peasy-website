---
id: thunk
title: Thunk
---

## Thunk<Model = {}, Payload = void, Injections = any, StoreModel = {}, Result = any>

Represents a `thunk`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Thunk, thunk } from 'easy-peasy';

interface Todos {
  items: string[];
  saved: Action<Todos, string>;
  save: Thunk<Todos, string>;
}

const todos: Todos = {
  items: [],
  saved: action((state, payload) => {
    state.items.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    await saveTodo(payload);
    actions.saved(payload);
  })
};
```

</p>
</details>