import React from 'react';

const Form = ({ children, onSubmit }) => {
  /**
   * handleOnSubmit
   * @param {object} event Form submit event
   */

  function handleOnSubmit(event) {
    if ( typeof onSubmit === 'function' ) {
      onSubmit(event);
    }
  }

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      { children }
    </form>
  )
}

export default Form;