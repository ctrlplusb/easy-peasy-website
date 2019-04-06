---
id: creating-the-store
title: Creating the Store
---

Firstly you need to define your model. This represents the structure of your Redux state along with its default values. Your model can be as deep and complex as you like. Feel free to split your model across many files, importing and composing them as you like.

```javascript
const model = {
  todos: {
    items: [],
  }
};
```

Then you provide your model to `createStore`.

```javascript
import { createStore } from 'easy-peasy';

const store = createStore(model);
```

You will now have a [Redux store](https://redux.js.org/api/store) - all the standard APIs of a Redux store is available to you. 👍
