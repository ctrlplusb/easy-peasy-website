---
id: with-react
title: With React
---

We will now cover how to integrate your store with your React components. We leverage [Hooks](https://reactjs.org/docs/hooks-intro.html) to do so. If you aren't familiar with hooks yet we highly recommend that you read the [official documentation](https://reactjs.org/docs/hooks-intro.html) and try playing with our [examples](#examples).

> If you want to be able to use your Easy Peasy store with Class components then you can utilise the `react-redux` package - this is covered further down in the tutorial.

> If you haven't done so already we highly recommend that you install the [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension). This will allow you to visualise your actions firing along with the associated state updates.

## Wrap your app with StoreProvider

Firstly you need to create your store then wrap your application with the `StoreProvider`.

```javascript
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model'

const store = createStore(model);

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)
```

## Accessing state in your Components

To access state within your components you can use the `useStore` hook.

```javascript
import { useStore } from 'easy-peasy';

const TodoList = () => {
  const todos = useStore(state => state.todos.items);
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo.text}</div>)}
    </div>
  );
};
```

In the case that your `useStore` implementation depends on an "external" value when mapping state, you should provide the respective "external" within the second argument to the `useStore`. This is a similar requirement to some of the official hooks that are bundled with React. The `useStore` hook will then track the external value and ensure that the state is remapped every time the external value(s) change.

```javascript
import { useStore } from 'easy-peasy';

const Product = ({ id }) => {
  const product = useStore(
    state => state.products[id], // 👈 we are using an external value: "id"
    [id] // 👈 we provide "id" so our useStore knows to re-execute mapState
         //    if the "id" value changes
  );
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};
```

We recommend that you read the API docs for the [`useStore` hook](#usestoremapstate) to gain a full understanding of the behaviours and pitfalls of the hook.

## Dispatching actions in your Components

In order to fire actions in your components you can use the `useActions` hook.

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

For more on how you can use this hook please ready the API docs for the [`useActions` hook](#useactionsmapactions).

## Usage via react-redux

As Easy Peasy outputs a standard Redux store it is entirely possible to use Easy Peasy with the official [`react-redux`](https://github.com/reduxjs/react-redux) package.

This allows you to do a few things:

 - Slowly migrate a legacy application that is built using `react-redux`
 - Connect your store to Class components via `connect`

<details>
<summary>First, install the `react-redux` package</summary>
<p>

```bash
npm install react-redux
```

</p>
</details>

<details>
<summary>Then wrap your app with the `Provider`</summary>
<p>

```javascript
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'easy-peasy';
import { Provider } from 'react-redux'; // 👈 import the provider
import model from './model';
import TodoList from './components/TodoList';

// 👇 then create your store
const store = createStore(model);

const App = () => (
  // 👇 then pass it to the Provider
  <Provider store={store}>
    <TodoList />
  </Provider>
)

render(<App />, document.querySelector('#app'));
```

</p>
</details>

<details>
<summary>Finally, use `connect` against your components</summary>
<p>

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux'; // 👈 import the connect

function TodoList({ todos, addTodo }) {
  return (
    <div>
      {todos.map(({id, text }) => <Todo key={id} text={text} />)}
      <AddTodo onSubmit={addTodo} />
    </div>
  )
}

export default connect(
  // 👇 Map to your required state
  state => ({ todos: state.todos.items }
  // 👇 Map your required actions
  dispatch => ({ addTodo: dispatch.todos.addTodo })
)(EditTodo)
```

</p>
</details>

<p>&nbsp;</p>

This is by no means an exhaustive overview of Easy Peasy.
We _highly_ recommend you read through the [API](#API) documentation to gain a more full understanding of the tools and helpers that Easy Peasy exposes to you.

<p>&nbsp;</p>