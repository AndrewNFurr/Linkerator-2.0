import { useState } from 'react';

// useToggle is a custom hook to toggle an piece of state to true/false (i.e. show a menu, check a box etc.)
// It takes an initial value as a piece of state, and has a built-in toggle function to set said state to true/false.
// It reduces the need for helper functions commonly used through tons of different components.
// See the example below for how it can be used.

const useToggle = (initVal = false) => {
  const [state, setState] = useState(initVal);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggle;

/*
import React, { useState } from 'react';

import useToggle from './hooks/useToggle';

const Toggler = () => {
  const [isHappy, toggleIsHappy] = useToggle(true);
  const [isCold, toggleIsCold] = useToggle(true);

 

  return (
    <>
      <h1 onClick={toggleIsHappy}>{isHappy ? '😄' : '😟'}</h1>
      <h1 onClick={toggleIsCold}>{isCold ? '🥶' : '🥵'}</h1>
    </>
  );
};

export default Toggler;
*/
