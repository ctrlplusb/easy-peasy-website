---
id: action
title: Action
---


## Action<Model = {}, Payload = any>

Represents an `action`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Action, action } from 'easy-peasy';

interface Todos {
  items: string[];
  add: Action<Todos, string>;
}

const todos: Todos = {
  items: [],
  add: action((state, payload) => {
    state.items.push(payload);
  })
};
```

</p>
</details>