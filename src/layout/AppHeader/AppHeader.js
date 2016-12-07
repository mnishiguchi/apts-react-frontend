import React from 'react';
import { Link } from  'react-router';

// Components
import Logo    from './Logo/Logo';
import NavLink from './NavLink/NavLink';

// https://react-bootstrap.github.io/components.html#navigation
import Navbar       from 'react-bootstrap/lib/Navbar';
import Button       from 'react-bootstrap/lib/Button';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';

// Styles
import './AppHeader.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const AppHeader = (props) => {
  return (
    <div className="AppHeader">
      <Navbar bsStyle="inverse">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" activeClassName="active"><Logo /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button className="hidden-xs" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </Navbar.Form>

          {props.children}

          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Join</NavLink>
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
