---
id: useActions
title: useActions(mapActions)
---

A [hook](https://reactjs.org/docs/hooks-intro.html) granting your components access to the store's actions.

## Arguments

  - `mapActions` (Function, required)

    The function that is used to resolved the action(s) that your component requires. Your `mapActions` can either resolve single or multiple actions. The function will receive the following arguments:

    - `actions` (Object, required)

      The `actions` of your store.

## Examples

```javascript
import { useState } from 'react';
import { useActions } from 'easy-peasy';

const AddTodo = () => {
  const [text, setText] = useState('');
  const addTodo = useActions(actions => actions.todos.add);
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => addTodo(text)}>Add</button>
    </div>
  );
};
```

### Resolving multiple actions

```javascript
import { useState } from 'react';
import { useActions } from 'easy-peasy';

const EditTodo = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const { saveTodo, removeTodo } = useActions(actions => ({
    saveTodo: actions.todos.save,
    removeTodo: actions.todo.toggle
  }));
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => saveTodo(todo.id)}>Save</button>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
  );
};
```