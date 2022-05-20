// s02-02 ref by useState
import * as React from 'react';
import RenderCounter from 'RenderCounter';
import useForceRerender from 'useForceRerender';

function App() {
  const forceRerender = useForceRerender();
  // 🔍 ref created by useState()
  const [count] = React.useState({ current: 0 });

  const handleClick = () => {
    count.current = count.current + 1;
  };

  console.log('# render', count.current, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        ref by useState()
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
