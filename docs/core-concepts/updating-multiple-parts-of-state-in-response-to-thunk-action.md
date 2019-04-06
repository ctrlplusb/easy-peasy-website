---
id: updating-multiple-parts-of-state-in-response-to-thunk-action
title: Updating Multiple Parts of State in Response to a thunk/action
---

When firing an action you may want multiple parts of your model to respond to it. For example, you may want to clear certain parts of your state when a user logs out. Or perhaps you want an audit log that tracks specific events.

Easy Peasy provides you with the `listen` helper to do this.

```javascript
import { listen } from 'easy-peasy'; // 👈 import then helper

const todosModel = {
  items: [],
  // 👇 the action we wish to respond to / track
  addTodo: action((state, payload) => {
    state.items.push(payload)
  })
};

const auditModel = {
  logs: [],
  //          👇 declare listeners via the helper
  listeners: listen((on) => {
    on(
      //           👇 pass in the reference to the action we wish to listen to
      todosModel.addTodo,
      // 👇 the action we wish to execute after `addTodo` has completed
      action((state, payload) => {
        state.logs.push(`Added a new todo: ${payload}`);
      })
    );
  })
};

const model = {
  todos: todosModel,
  audit: auditModel
};
```

This is a more advanced feature, however, using this method allows a clearer seperation of concerns and promotes reactive programming.

You can do more than this with the `listen` helper. You can listen to an `action` or a `thunk`, and can execute either an `action` or a `thunk` in response. Please read the [docs](#listenon) for more information.
