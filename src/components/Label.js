import React from 'react';

const Label = ({ children, ...rest }) => {
  const labelProps = {
    ...rest
  }
  return <label className="label" {...labelProps}>{ children }</label>
}

export default Label;