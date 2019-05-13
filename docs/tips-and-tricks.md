---
id: tips
title: Tips & Tricks
---

Below are a few useful tips and tricks when using Easy Peasy.

## Generalising effects/actions/state via helpers

You may identify repeated patterns within your store implementation. It is possible to generalise these via helpers.

For example, say you had the following:

```javascript
const store = createStore({
  products: {
    data: {},
    ids: select(state => Object.keys(state.data)),
    fetched: action((state, products) => {
      products.forEach(product => {
        state.data[product.id] = product;
      });
    }),
    fetch: thunk(async (actions) => {
      const data = await fetchProducts();
      actions.fetched(data);
    })
  },
  users: {
    data: {},
    ids: select(state => Object.keys(state.data)),
    fetched: action((state, users) => {
      users.forEach(user => {
        state.data[user.id] = user;
      });
    }),
    fetch: thunk(async (dispatch) => {
      const data = await fetchUsers();
      actions.fetched(data);
    })
  }
})
```

You will note a distinct pattern between the `products` and `users`. You could create a generic helper like so:

```javascript
const data = (endpoint) => ({
  data: {},
  ids: select(state => Object.keys(state.data)),
  fetched: action((state, items) => {
    items.forEach(item => {
      state.data[item.id] = item;
    });
  }),
  fetch: thunk(async (actions, payload) => {
    const data = await endpoint();
    actions.fetched(data);
  })
})
```

You can then refactor the previous example to utilise this helper like so:

```javascript
const store = createStore({
  products: {
    ...data(fetchProducts)
    // attach other state/actions/etc as you like
  },
  users: {
    ...data(fetchUsers)
  }
})
```

This produces an implementation that is like for like in terms of functionality but far less verbose.
