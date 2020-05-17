import PropTypes from 'prop-types';
import React from 'react';

import ClassName from 'models/classname';

const FormRow = ({ children, className }) => {
  const formRowClass = new ClassName( 'form-row' );

  formRowClass.addIf( className, className );

  return <div className={formRowClass.className}>{ children }</div>;
};

FormRow.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default FormRow;
