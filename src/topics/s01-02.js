// s01-02 stale closure problem
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  // use `let` for 🧪4
  let [count, setCount] = React.useState(0);
  const handleClick = () => {
    // 🧪1. How much increase?
    setCount(count + 1);
    setCount(count + 1);

    // 🧪cf.
    // setCount((c) => c + 1);
    // setCount((c) => c + 1);

    // 🧪2. click 5 times before timeout
    // setTimeout(() => {
    //   console.log('. timeout');
    //   setCount(count + 1);
    // }, 3000);

    // 🧪3. same value = no re-render
    // setCount(0);

    // 🧪4. same value by updater = no re-render
    // setCount((c) => c);

    // 🧪5. direct change = no re-render, nothing happens
    // count = count + 1;
  };

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        stale closure problem
      </div>
      <div>count: {count}</div>
      <div>
        <button onClick={handleClick}>increase</button>
      </div>
    </div>
  );
}

export default App;
