// s03-01 effect, `useEffect()`
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  React.useEffect(() => {
    console.log('- useEffect()', count);
    document.title = `${count} - ${Date.now()}`;
  });

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        effect, useEffect()
      </div>
      <div>count: {count}</div>
      <div>
        <button onClick={handleClick}>increase</button>
      </div>
    </div>
  );
}

export default App;
