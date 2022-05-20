// s01-01 state by useState()
import * as React from 'react';
import RenderCounter from 'RenderCounter';

function App() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    // 🚩 code smell
    setCount(count + 1);
  };

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        state by useState()
      </div>
      <div>count: {count}</div>
      <div>
        <button onClick={handleClick}>increase</button>
      </div>
    </div>
  );
}

export default App;
