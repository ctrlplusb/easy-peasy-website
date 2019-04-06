---
id: dispatching-thunk-action-directly-via-store
title: Dispatching a thunk action Directly via the Store
---

You can dispatch a thunk action in the same manner as a normal action. A `thunk` action always returns a `Promise` allowing you to execute any process after the `thunk` has completed.

```javascript
store.dispatch.todos.saveTodo('Install easy-peasy').then(() => {
  console.log('Todo saved');
})
```