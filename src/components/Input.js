import React from 'react';

const Input = ({ type = 'text', id, name, ...rest }) => {

  if ( !name && id ) {
    name = id;
  } else if ( !id && name ) {
    id = name;
  }

  const inputProps = {
    ...rest,
    id,
    name
  }

  return <input className="input" {...inputProps} />
}

export default Input;