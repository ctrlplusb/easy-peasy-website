---
id: reducer
title: Reducer
---

## Reducer<State = any, Action = ReduxAction>


Represents a `reducer`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Reducer, reducer } from 'easy-peasy';
import { RouterState, routerReducer } from 'my-router-solution';

interface Model {
  router: Reducer<RouterState>;
}

const model: Model = {
  router: reducer(routerReducer)
};
```

</p>
</details>