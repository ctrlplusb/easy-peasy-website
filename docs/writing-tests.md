---
id: writing-tests
title: Writing Tests
---

The below covers some strategies for testing your store / components. If you have any useful test strategies please consider making a pull request so that we can expand this section.

All the below examples are using [Jest](https://jestjs.io) as the test framework, but the ideas should hopefully translate easily onto your test framework of choice.

In the examples below you will see that we are testing specific parts of our model in isolation. This makes it far easier to do things like bootstrapping initial state for testing purposes, whilst making your tests less brittle to changes in your full store model structure.

<details>
<summary>Testing an action</summary>
<p>

Actions are relatively simple to test as they are essentially an immutable update to the store. We can therefore test the difference.

Given the following model under test:

```typescript
import { action } from 'easy-peasy'

const todosModel = {
  items: {},
  add: action((state, payload) => {
    state.items[payload.id] = payload
  }),
}
```

We could test it like so:

```typescript
test('add action', async () => {
  // arrange
  const todo = { id: 1, text: 'foo' }
  const store = createStore(todosModel)

  // act
  store.dispatch.add(todo)

  // assert
  expect(store.getState().items).toEqual({ [todo.id]: todo })
})
```

</p>
</details>

<details>
<summary>Testing a thunk</summary>
<p>

Thunks are more complicated to test than actions as they can invoke network requests and other actions.

There will likely be seperate tests for our actions, therefore it is recommended that you don't test for the state changes of actions fired by your thunk. We rather recommend that you test for what actions were fired from your thunk under test.

To do this we expose an additional configuration value on the `createStore` API, specifically `mockActions`. If you set the `mockActions` configuration value, then all actions that are dispatched will not affect state, and will instead be mocked and recorded. You can get access to the recorded actions via the `getMockedActions` function that is available on the store instance. We took inspiration for this functionality from the awesome [`redux-mock-store`](https://github.com/dmitry-zaets/redux-mock-store) package.

In addition to this approach, if you perform side effects such as network requests within your thunks, we highly recommend that you expose the modules you use to do so via the `injections` configuration variable of your store. If you do this then it makes it significantly easier to provide mocked instances to your thunks when testing.

We will demonstrate all of the above within the below example.

Given the following model under test:

```typescript
import { action, thunk } from 'thunk';

const todosModel = {
  items: {},
  add: action((state, payload) => {
    state.items[payload.id] = payload
  }),
  fetchById: thunk(async (actions, payload, helpers) => {
    const { injections } = helpers
    const todo = await injections.fetch(`/todos/${payload}`).then(r => r.json())
    actions.add(todo)
  }),
}
```

We could test it like so:

```typescript
import { createStore, actionName, thunkStartName, thunkCompleteName, thunkFailName } from 'easy-peasy'

const createFetchMock = response =>
  jest.fn(() => Promise.resolve({ json: () => Promise.resolve(response) }))

test('fetchById', async () => {
  // arrange
  const todo = { id: 1, text: 'Test my store' }
  const fetch = createFetchMock(todo)
  const store = createStore(todosModel, {
    injections: { fetch },
    mockActions: true,
  })

  // act
  await store.dispatch.fetchById(todo.id)

  // assert
  expect(fetch).toHaveBeenCalledWith(`/todos/${todo.id}`)
  expect(store.getMockedActions()).toEqual([
    { type: thunkStartName(todosModel.fetchById), payload: todo.id },
    { type: actionName(todosModel.add), payload: todo },
    { type: thunkCompleteName(todosModel.fetchById), payload: todo.id },
  ])
})
```

</p>
</details>

<details>
<summary>Testing components</summary>
<p>

When testing your components I strongly recommend the approach recommended by Kent C. Dodd's awesome [Testing Javascript](https://testingjavascript.com/) course, where you try to test the behaviour of your components using a natural DOM API, rather than reaching into the internals of your components. He has published a very useful package by the name of [`react-testing-library`](https://github.com/kentcdodds/react-testing-library) to help us do so. The tests below shall be adopting this package and strategy.

Imagine we were trying to test the following component.

```typescript
function Counter() {
  const count = useStore(state => state.count)
  const increment = useActions(actions => actions.increment)
  return (
    <div>
      Count: <span data-testid="count">{count}</span>
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  )
}
```

As you can see it is making use of our hooks to gain access to state and actions of our store.

We could adopt the following strategy to test it.

```typescript
import { createStore, StoreProvider } from 'easy-peasy'
import model from './model';

test('Counter', () => {
  // arrange
  const store = createStore(model)
  const app = (
    <StoreProvider store={store}>
      <ComponentUnderTest />
    </StoreProvider>
  )

  // act
  const { getByTestId, getByText } = render(app)

  // assert
  expect(getByTestId('count').textContent).toEqual('0')

  // act
  fireEvent.click(getByText('+'))

  // assert
  expect(getByTestId('count').textContent).toEqual('1')
})
```

As you can see we create a store instance in the context of our test and wrap the component under test with the `StoreProvider`. This allows our component to act against our store.

We then interact with our component using the DOM API exposed by the render.

This grants us great power in being able to test our components with a great degree of confidence that they will behave as expected.

Some other strategies that you could employ whilst using this pattern include:

  - Providing an initial state to your store within the test.

    ```typescript
    test('Counter', () => {
      // arrange
      const store = createStore(model, { initialState: initialStateForTest })

      // ...
    })
    ```

  - Utilising the `injections` and `mockActions` configurations of the `createStore` to avoid performing actions with side effects in your test.

There is no one way to test your components, but it is good to know of the tools available to you. However you choose to test your components, I do recommend that you try to test them as close to their real behaviour as possible - i.e. try your best to prevent implementation details leaking into your tests.

</p>
</details>

<p>&nbsp;</p>