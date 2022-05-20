// s04-02 prop drilling
import * as React from 'react';
import RenderCounter from 'RenderCounter';

function App() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  console.log('# render', count, Date.now());
  return (
    <div className="component">
      <div>
        <RenderCounter />
        prop drilling
      </div>
      <Middle count={count} onClick={handleClick} />
    </div>
  );
}

export default App;

// ----------------------------------------

function CountView({ count }) {
  return (
    <div className="component">
      <RenderCounter />
      CountView: {count}
    </div>
  );
}

function CountButton({ onClick }) {
  return (
    <div className="component">
      <RenderCounter />
      CountButton: <button onClick={onClick}>increase</button>
    </div>
  );
}

function Middle(props) {
  const { count, onClick } = props;

  return (
    <div className="component">
      <div>
        <RenderCounter />
        Middle
      </div>
      <CountView count={count} />
      <CountButton onClick={onClick} />
    </div>
  );
}
