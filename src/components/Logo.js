import React from 'react';

import logo from 'assets/images/launchtime-logo.svg';

const Logo = () => {
  return (
    <span className="logo">
      <img src={logo} alt="LaunchTime Logo" />
      LaunchTime
    </span>
  );
};

export default Logo;
