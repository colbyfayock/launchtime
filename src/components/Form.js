import PropTypes from 'prop-types';
import React from 'react';

import ClassName from 'models/classname';

const Form = ({ children, className, onSubmit }) => {
  const formClass = new ClassName( 'form' );

  formClass.addIf( className, className );

  /**
   * handleOnSubmit
   * @param {object} event Form submit event
   */

  function handleOnSubmit( event ) {
    if ( typeof onSubmit === 'function' ) {
      onSubmit( event );
    }
  }

  return (
    <form className={formClass.className} onSubmit={handleOnSubmit}>
      { children }
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
