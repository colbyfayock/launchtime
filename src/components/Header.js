import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';
import Logo from 'components/Logo';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <p className="header-logo">
          <Link to="/"><Logo /></Link>
        </p>
        <div className="header-account">
          <p className="header-avatar">
            <img src="/images/avatar.jpg" alt="Colby Fayock" />
          </p>
        </div>
      </Container>
    </header>
  );
};

export default Header;
