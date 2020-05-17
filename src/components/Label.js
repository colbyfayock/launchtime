import PropTypes from 'prop-types';
import React from 'react';

const Label = ({ children, ...rest }) => {
  const labelProps = {
    ...rest,
  };
  return (
    <label className="label" {...labelProps}>
      { children }
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.any,
};

export default Label;
