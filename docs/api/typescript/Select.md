---
id: select
title: Select
---

## Select<Model = {}, Result = any>

Represents a `select`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Select, select } from 'easy-peasy';

interface Todos {
  items: string[];
  firstTodo: Select<Todos, string | undefined>;
}

const todos: Todos = {
  items: [],
  firstTodo: select((state) => {
    return state.items.length > 0 ? state.items[0] : undefined;
  })
};
```

</p>
</details>
