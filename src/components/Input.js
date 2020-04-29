import React from 'react';

import ClassName from 'models/classname';

const Input = ({ type = 'text', id, name, className, ...rest }) => {

  const inputClass = new ClassName('input');

  inputClass.addIf(className, className);

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

  return <input key={rest.defaultValue} className={inputClass.className} {...inputProps} />
}

export default Input;