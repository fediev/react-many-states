// s06-01 problem of context. no partial update
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        problem of context. no partial update
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
const CounterDispatchContext = React.createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment': {
      return { ...state, count: state.count + state.step };
    }
    case 'decrement': {
      return { ...state, count: state.count - state.step };
    }
    case 'increaseStep': {
      return { ...state, step: state.step + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = { count: 0, step: 1 };
const CounterProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(counterReducer, initialState);

  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStateContext.Provider value={state}>
        <div className="component">
          <div>
            <RenderCounter />
            CounterProvider
          </div>
          {children}
        </div>
      </CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  );
};

function useCounterStateContext() {
  const context = React.useContext(CounterStateContext);
  if (context === undefined) {
    throw new Error(
      'useCounterStateContext() must be used within a CounterProvider'
    );
  }
  return context;
}

function useCounterDispatchContext() {
  const context = React.useContext(CounterDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCounterDispatchContext() must be used within a CounterProvider'
    );
  }
  return context;
}

// ----------------------------------------

function CountView() {
  const { count } = useCounterStateContext();

  return (
    <div className="component">
      <RenderCounter />
      CountView: {count}
    </div>
  );
}

function CountButton() {
  const dispatch = useCounterDispatchContext();
  const handleIncreaseClick = () => {
    dispatch({ type: 'increment' });
  };
  const handleDecreaseClick = () => {
    dispatch({ type: 'decrement' });
  };
  const handleIncreaseStepClick = () => {
    dispatch({ type: 'increaseStep' });
  };

  return (
    <div className="component">
      <RenderCounter />
      CountButton: <button onClick={handleIncreaseClick}>increase</button>
      <button onClick={handleDecreaseClick}>decrease</button>
      <button onClick={handleIncreaseStepClick}>increase step</button>
    </div>
  );
}

function StepView() {
  const { step } = useCounterStateContext();

  return (
    <div className="component">
      <RenderCounter />
      StepView: {step}
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
      <StepView />
      <CountButton />
    </div>
  );
}
