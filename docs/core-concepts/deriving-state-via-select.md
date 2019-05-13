---
id: deriving-state-via-select
title: Deriving State via `select
---

If you have state that can be derived from state then you can use the [`select`](#selectselector) helper. Simply attach it to any part of your model.

```javascript
import { select } from 'easy-peasy'; // 👈 import then helper

const store = createStore({
  shoppingBasket: {
    products: [{ name: 'Shoes', price: 123 }, { name: 'Hat', price: 75 }],
    totalPrice: select(state =>
      state.products.reduce((acc, cur) => acc + cur.price, 0)
    )
  }
}
```

The derived data will be cached and will only be recalculated when the associated state changes.

This can be really helpful to avoid unnecessary re-renders in your react components, especially when you do things like converting an object map to an array in your `connect`. Typically people would use [`reselect`](https://github.com/reduxjs/reselect) to alleviate this issue, however, with Easy Peasy it's this feature is baked right in.

> Note: we don't recommend attaching selectors to the root of your store, as those will be executed for _every_ change to your store. If you absolutely need to, try to attach as few selectors to the root as you can.
