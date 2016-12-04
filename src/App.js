import React, { Component } from 'react';

// Components
import AppHeader from './components/AppHeader/AppHeader';

// https://react-bootstrap.github.io/components.html#navigation
import Col      from 'react-bootstrap/lib/Col';
import Grid     from 'react-bootstrap/lib/Grid';
import Row      from 'react-bootstrap/lib/Row';

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />

        <Grid>
          <Row>
            <Col sm={6}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
            <Col sm={6}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;
