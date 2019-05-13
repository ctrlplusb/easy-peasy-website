---
id: useDispatch
title:  useDispatch()
---

A [hook](https://reactjs.org/docs/hooks-intro.html) granting your components access to the store's dispatch.

## Examples

```javascript
import { useState } from 'react';
import { useDispatch } from 'easy-peasy';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: text })}>Add</button>
    </div>
  );
};
```