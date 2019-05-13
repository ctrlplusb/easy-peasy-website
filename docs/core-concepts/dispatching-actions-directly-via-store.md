---
id: dispatching-actions-directly-via-store
title: Dispatching Actions Directly via the Store
---

Easy Peasy will bind your actions against the stores `dispatch`. They will be bound using paths that match the location of the action on your model.

```javascript
//                                    |-- payload
//                           |------------------|
store.dispatch.todos.addTodo('Install easy-peasy');
//            |-------------|
//                  |-- path matches our model (todos.addTodo)
```

Call `getState` to see the updated state.

```javascript
store.getState().todos.items;
// ['Install easy-peasy']
```