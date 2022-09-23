// s05-02 seperate contexts for state value and updater
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        seperate contexts for state value and updater
      </div>
      <CounterProvider>
        <Middle />
      </CounterProvider>
    </div>
  );
}

export default App;

// ----------------------------------------

const CounterStateContext = React.createContext();
const CounterUpdaterContext = React.createContext();

function CounterProvider({ children }) {
  const [count, setCount] = React.useState(0);

  return (
    <CounterUpdaterContext.Provider value={setCount}>
      <CounterStateContext.Provider value={count}>
        <div className="component">
          <div>
            <RenderCounter />
            CounterProvider
          </div>
          {children}
        </div>
      </CounterStateContext.Provider>
    </CounterUpdaterContext.Provider>
  );
}

function useCounterStateContext() {
  const context = React.useContext(CounterStateContext);
  if (context === undefined) {
    throw new Error(
      'useCounterStateContext() must be used within a CounterProvider'
    );
  }
  return context;
}

function useCounterUpdaterContext() {
  const context = React.useContext(CounterUpdaterContext);
  if (context === undefined) {
    throw new Error(
      'useCounterUpdaterContext() must be used within a CounterProvider'
    );
  }
  return context;
}

// ----------------------------------------

function CountView() {
  const count = useCounterStateContext();

  return (
    <div className="component">
      <RenderCounter />
      CountView: {count}
    </div>
  );
}

function CountButton() {
  const setCount = useCounterUpdaterContext();
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
