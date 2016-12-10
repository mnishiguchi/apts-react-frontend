import React from 'react';

// Components
import Logo      from './Logo/Logo';
import NavLink   from './NavLink/NavLink';
import SearchBar from './SearchBar/SearchBar';

// https://react-bootstrap.github.io/components.html#navigation
import Navbar     from 'react-bootstrap/lib/Navbar';

// Styles
import './AppHeader.css';

const AppHeader = (props) => {
  return (
    <div className="AppHeader">
      <Navbar bsStyle="inverse">
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/"><Logo /></NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <SearchBar {...props} />

          {props.children}

          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/help">Help</NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppHeader;
