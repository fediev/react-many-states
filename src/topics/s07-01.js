// s07-01 unbatched state updates
// should be tested on react 17
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  const [val1, setVal1] = React.useState(100);
  const [val2, setVal2] = React.useState(200);

  const normalEventHandler = () => {
    console.log('- normalEventHandler', val1, val2);
    setVal1((v) => v + 1);
    console.log('. normalEventHandler: setVal1', val1, val2);
    setVal2((v) => v + 1);
    console.log('. normalEventHandler: setVal2', val1, val2);
  };

  const asyncEventHandelr = async () => {
    console.log('- asyncEventHandelr', val1, val2);
    await Promise.resolve();

    setVal1((v) => v + 1);
    // 🚩 stale closure
    console.log('. asyncEventHandelr: setVal1', val1, val2);
    setVal2((v) => v + 1);
    // 🚩 stale closure
    console.log('. asyncEventHandelr: setVal2', val1, val2);
  };

  console.log('# render', val1, val2, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        unbatched state updates
      </div>
      <div>val1: {val1} </div>
      <div>val2: {val2} </div>
      <button onClick={normalEventHandler}>normalEventHandler</button>
      <button onClick={asyncEventHandelr}>asyncEventHandelr</button>
    </div>
  );
}

export default App;
