import React, { Component } from 'react';

// Components
import Logo from './Logo/Logo';

// https://react-bootstrap.github.io/components.html#navigation
import Button       from 'react-bootstrap/lib/Button';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Nav          from 'react-bootstrap/lib/Nav';
import Navbar       from 'react-bootstrap/lib/Navbar';
import NavItem      from 'react-bootstrap/lib/NavItem';

// Styles
import './AppHeader.css';

class AppHeader extends Component {
  render() {
    return (
      <div className="AppHeader">
        <Navbar bsStyle="inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">
                <Logo />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button className="hidden-xs" type="submit">Submit</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={1} href="#search">Search</NavItem>
              <NavItem eventKey={2} href="#log_in">Log in</NavItem>
              <NavItem eventKey={3} href="#sign_up">Join</NavItem>
              <NavItem eventKey={4} href="#help">Help</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppHeader;
