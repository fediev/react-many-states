# Many States of React State

Copy-paste codes in topics on `App.js`.

## topics

- s01-01. state by `useState()`
- s01-02. stale closure problem
- s02-01. ref, `useRef()`, `RenderCounter`, `useForceRerender()`
- s02-02. ref by `useState()`
- s03-01. effect, `useEffect()`
- s03-02. `useEffect()` and dependencies
- s04-01. lifted state
  - https://reactjs.org/docs/lifting-state-up.html
- s04-02. prop drilling
- s05-01. passing state via context
- s05-02. seperate contexts for state value and updater
- s05-03. context with `useReducer()`
- s06-01. problem of context. no partial update
- s06-02. jotai for partial update of global state
  - https://jotai.org/
- s07-01. unbatched state updates. should be tested on react 17
- s07-02. batched state updates with `unstable_batchedUpdates()`
  - no need on react 18
  - https://github.com/reactwg/react-18/discussions/21
- s08-01. api request with container pattern
  - https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- s08-02. api request with custom hook
- s08-03. api request with react-query
