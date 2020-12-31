import { useState } from 'react';

const useInputState = (initVal) => {
  const [value, setValue] = useState(initVal);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, handleChange, reset];
};

export default useInputState;

// useInputState is a custom hook for handling form inputs.
// It's used just liked useState when a form input is needed.
// It uses a piece of state, and provides built-in helper functions to handle the input change, and reset the input field upon submittal.
// See the example below for how it can be used...

/*
import React from 'react';
import useInputState from './hooks/useInputState';

const SimpleInputFormHook = () => {
  const [email, handleEmailChange, resetEmail] = useInputState('');
  const [password, handlePasswordChange, resetPassword] = useInputState('');

  return (
    <>
      <div>
        <h1>
          Email is.. {email} & Password is.. {password}
        </h1>
        <input type="text" value={email} onChange={handleEmailChange} />
        <input type="text" value={password} onChange={handlePasswordChange} />
        <button onClick={resetEmail}>Reset Email</button>
        <button onClick={resetPassword}>Reset Password</button>
      </div>
    </>
  );
};

export default SimpleInputFormHook;
*/
