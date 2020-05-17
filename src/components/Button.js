import PropTypes from 'prop-types';
import React from 'react';

import ClassName from 'models/classname';

const Button = ({ children, className, color, ...rest }) => {
  const buttonClass = new ClassName( 'button' );

  buttonClass.addIf( className, className );
  buttonClass.addIf( `${buttonClass.className}-color-${color}`, color );

  return (
    <button className={buttonClass.className} {...rest}>
      { children }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
