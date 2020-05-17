import PropTypes from 'prop-types';
import React from 'react';

import ClassName from 'models/classname';

const Input = ({ type = 'text', id, name, className, ...rest }) => {
  const inputClass = new ClassName( 'input' );

  inputClass.addIf( className, className );

  if ( !name && id ) {
    name = id;
  } else if ( !id && name ) {
    id = name;
  }

  const inputProps = {
    ...rest,
    id,
    name,
  };

  return <input key={rest.defaultValue} className={inputClass.className} type={type} {...inputProps} />;
};

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
