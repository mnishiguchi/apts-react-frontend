import React from 'react';

// https://react-bootstrap.github.io/components.html#navigation
import Navbar    from 'react-bootstrap/lib/Navbar';

// Components
import Logo                from './Logo/Logo';
import NavLink             from './NavLink/NavLink';

import SearchFormContainer from '../../containers/SearchFormContainer/SearchFormContainer';

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

          <SearchFormContainer />

          {props.children}

          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/">Home</NavLink>
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
