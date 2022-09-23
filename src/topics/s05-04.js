// s05-04 place children directly, instead of using children prop
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        place children directly, instead of using children prop
      </div>
      <CounterProvider />
    </div>
  );
}

export default App;

// ----------------------------------------

const CounterContext = React.createContext();

function CounterProvider() {
  const [count, setCount] = React.useState(0);
  const contextValue = React.useMemo(
    () => [count, setCount],
    [count] // state updater returned by `useState` is alway identical
  );

  console.log('- CounterProvider render', Date.now());
  return (
    <CounterContext.Provider value={contextValue}>
      <div className="component">
        <div>
          <RenderCounter />
          CounterProvider
        </div>
        <Middle />
      </div>
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
