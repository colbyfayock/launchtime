import React from 'react';

const Input = ({ type = 'text', ...rest }) => {
  const inputProps = {
    ...rest
  }
  return <input className="input" {...inputProps} />
}

export default Input;