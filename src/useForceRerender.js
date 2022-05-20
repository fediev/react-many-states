import * as React from 'react';

export default function useForceRerender() {
  const [, forceRerender] = React.useReducer(() => ({}), {});
  return forceRerender;
}
