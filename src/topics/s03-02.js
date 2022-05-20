// s03-01 effect, useEffect
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
    document.title = count;
  }, [count]);

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        useEffect() dependencies
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
