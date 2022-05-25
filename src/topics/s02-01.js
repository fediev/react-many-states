// s02-01 ref, `useRef()`, `RenderCounter`, `useForceRerender()`
import * as React from 'react';

import RenderCounter from 'RenderCounter';
import useForceRerender from 'useForceRerender';

function App() {
  const forceRerender = useForceRerender();
  const countRef = React.useRef(0);

  const handleClick = () => {
    countRef.current = countRef.current + 1;
  };

  console.log('# render', countRef.current, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        ref, `useRef()`, `RenderCounter`, `useForceRerender()`
      </div>
      <div>count: {countRef.current}</div>
      <div>
        <button onClick={handleClick}>increase</button>
        <button onClick={forceRerender}>forceRerender</button>
      </div>
    </div>
  );
}

export default App;
