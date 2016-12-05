import React, { Component } from 'react';

// Components
import AppHeader from './components/AppHeader/AppHeader';
import Map from './components/Map/Map';

// Styles
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      // TODO
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader />

        <section className="grid">
          <div className="flexible">
            <Map

              latitude={38.957575}
              longitude={-77.356746}
              zoom={8}
              listings={
                [
                  {
                    lngLat: [-77.356746, 38.957575],
                    description: `
                    <h4>Property 1</h4>
                    <p">Lorem ipsum.</p>
                    `
                  },
                  {
                    lngLat: [-77.321264, 38.943057],
                    description: `
                    <h4>Property 2</h4>
                    <p">Lorem ipsum .</p>
                    `
                  }
                ]
              }
            />
          </div>
          <div className="flexible">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

      </div>
    );
  }
}

export default App;
