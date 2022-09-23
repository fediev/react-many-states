// s04-03 normal component tree
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        normal component tree
      </div>
      <Parent />
    </div>
  );
}

export default App;

// ----------------------------------------

function Parent() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div className="component">
      <div>
        <RenderCounter />
        Parent: {count}
        <button onClick={handleClick}>increase</button>
      </div>
      <Children />
    </div>
  );
}

function Children() {
  return (
    <div className="component">
      <RenderCounter />
      Children
    </div>
  );
}
