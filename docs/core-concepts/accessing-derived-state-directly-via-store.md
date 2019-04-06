---
id: accessing-derived-state-directly-via-store
title: Accessing Derived State Directly via the Store
---

You can access derived state as though it were a normal piece of state.

```javascript
store.getState().shoppingBasket.totalPrice
```

> Note! See how we don't call the derived state as a function. You access it as a simple property.
