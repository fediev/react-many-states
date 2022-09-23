// s03-02 `useEffect()` and dependencies
import * as React from 'react';

import RenderCounter from 'RenderCounter';
import useForceRerender from 'useForceRerender';

function App() {
  const forceRerender = useForceRerender();
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  React.useEffect(() => {
    console.log('- useEffect()', count);
    document.title = `${count} - ${Date.now()}`;
  }, [count]);

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        `useEffect()` and dependencies
      </div>
      <div>count: {count}</div>
      <div>
        <button onClick={handleClick}>increase</button>
        <button onClick={forceRerender}>forceRerender</button>
      </div>
    </div>
  );
}

export default App;
