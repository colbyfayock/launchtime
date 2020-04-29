import React from 'react';

import ClassName from 'models/classname';

const FormRow = ({ children, className }) => {
  const formRowClass = new ClassName('form-row');

  formRowClass.addIf(className, className);

  return (
    <div className={formRowClass.className}>
      { children }
    </div>
  )
}

export default FormRow;