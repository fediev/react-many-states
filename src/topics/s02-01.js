// s02-01 ref, useRef
import * as React from 'react';
import RenderCounter from 'RenderCounter';
import useForceRerender from 'useForceRerender';

function App() {
  const forceRerender = useForceRerender();
  const count = React.useRef(0);

  const handleClick = () => {
    count.current = count.current + 1;
  };

  console.log('# render', count.current, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        ref, useRef
      </div>
      <div>count: {count.current}</div>
      <div>
        <button onClick={handleClick}>increase</button>
        <button onClick={forceRerender}>forceRerender</button>
      </div>
    </div>
  );
}

export default App;
