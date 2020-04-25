import React from 'react';

import ClassName from 'models/ClassName';

const Button = ({ children, className, color, ...rest }) => {
  const buttonClass = new ClassName('button');

  buttonClass.addIf(className, className);
  buttonClass.addIf(`${buttonClass.className}-color-${color}`, color);

  return (
    <button className={buttonClass.className} {...rest}>
      { children }
    </button>
  )
}

export default Button;