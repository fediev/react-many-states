import * as React from 'react';

function RenderCounter() {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.textContent = Number(ref.current.textContent || 0) + 1;
  });

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        margin: '0px 6px 0px 0px',
        padding: '2px 4px',
        borderRadius: 4,
        backgroundColor: '#ccc',
        fontSize: '0.8rem',
      }}
    />
  );
}

export default RenderCounter;
