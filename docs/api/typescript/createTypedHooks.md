---
id: createTypedHooks
title: createTypedHooks
---

## createTypedHooks<StoreModel = {}>()

Allows you to create typed versions of all the hooks so that you don't need to constantly apply typing information against them.

<details>
<summary>Example</summary>
<p>

```typescript
// hooks.js
import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from './model';

const { useActions, useStore, useDispatch } = createTypedHooks<StoreModel>();

export default {
  useActions,
  useStore,
  useDispatch
}
```

And then use your typed hooks in your components:

```typescript
import { useStore } from './hooks';

export default MyComponent() {
  //                          This will be typed
  //                                       👇
  const message = useStore(state => state.message);
  return <div>{message}</div>;
}
```

</p>
</details>

<p>&nbsp;</p>