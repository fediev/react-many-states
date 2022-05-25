// s05-01 passing state via context
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <CounterProvider>
      <div className="component">
        <div>
          <RenderCounter />
          passing state via context
        </div>
        <Middle />
      </div>
    </CounterProvider>
  );
}

export default App;

// ----------------------------------------

const CounterContext = React.createContext();

function CounterProvider({ children }) {
  const [count, setCount] = React.useState(0);
  const contextValue = React.useMemo(
    () => [count, setCount],
    [count] // state updater returned by `useState` is alway identical
  );

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounterContext() {
  return React.useContext(CounterContext);
}

// ----------------------------------------

function CountView() {
  const [count] = useCounterContext();

  return (
    <div className="component">
      <RenderCounter />
      CountView: {count}
    </div>
  );
}

function CountButton() {
  const [, setCount] = useCounterContext();
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="component">
      <RenderCounter />
      CountButton: <button onClick={handleClick}>increase</button>
    </div>
  );
}

function Middle() {
  return (
    <div className="component">
      <div>
        <RenderCounter />
        Middle
      </div>
      <CountView />
      <CountButton />
    </div>
  );
}
