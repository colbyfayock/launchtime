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
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
