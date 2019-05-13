---
id: listen
title: Listen
---


## Listen<Model = {}, Injections = any, StoreModel = {}>

Represents a `listen`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Listen, listen } from 'easy-peasy';

interface Audit {
  logs: string[];
  listen: Listen<Audit>;
}

const audit: Audit = {
  logs: [],
  listen: (on) => {
    on('ROUTE_CHANGED', action((state, payload) => {
      state.logs.push(payload.path);
    }));
  },
};
```

</p>
</details>