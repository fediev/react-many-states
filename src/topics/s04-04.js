// s04-04 ParentWithChildrenProp
import * as React from 'react';

import RenderCounter from 'RenderCounter';

function App() {
  console.log('# render', Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        passing via children prop
      </div>
      <ParentWithChildrenProp>
        <Children />
      </ParentWithChildrenProp>
    </div>
  );
}

export default App;

// ----------------------------------------

function ParentWithChildrenProp({ children }) {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div className="component">
      <div>
        <RenderCounter />
        ParentWithChildrenProp: {count}
        <button onClick={handleClick}>increase</button>
      </div>
      {children}
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
