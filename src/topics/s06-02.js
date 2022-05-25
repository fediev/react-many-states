// s06-02 jotai for partial update of global state
import * as React from 'react';
import { atom } from 'jotai';
import { selectAtom, useAtomValue, useUpdateAtom } from 'jotai/utils';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        jotai for partial update of global state
      </div>
      <Middle />
    </div>
  );
}

export default App;

// ----------------------------------------

const initialState = { count: 0, step: 1 };
const counterAtom = atom(initialState);

// method 1: use selector
const countAtom = selectAtom(counterAtom, (state) => state.count);
// method 2: derived atom
const stepAtom = atom(
  (get) => get(counterAtom).step,
  (get, set, updater) => {
    const prevState = get(counterAtom);
    const newStep = updater(prevState.step);
    set(counterAtom, { ...prevState, step: newStep });
  }
);

// ----------------------------------------

function CountView() {
  const count = useAtomValue(countAtom);

  return (
    <div className="component">
      <RenderCounter />
      CountView: {count}
    </div>
  );
}

function StepView() {
  const step = useAtomValue(stepAtom);

  return (
    <div className="component">
      <RenderCounter />
      StepView: {step}
    </div>
  );
}

function IncreaseButton() {
  const counterUpdater = useUpdateAtom(counterAtom);

  const handleClick = () => {
    counterUpdater((state) => ({ ...state, count: state.count + state.step }));
  };

  return (
    <div className="component">
      <RenderCounter />
      IncreaseButton: <button onClick={handleClick}>increase</button>
    </div>
  );
}

function IncreaseStepButton() {
  const stepUpdater = useUpdateAtom(stepAtom);

  const handleClick = () => {
    stepUpdater((step) => step + 1);
  };

  return (
    <div className="component">
      <RenderCounter />
      IncreaseStepButton
      <button onClick={handleClick}>increase step</button>
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
      <IncreaseButton />
      <IncreaseStepButton />
    </div>
  );
}
