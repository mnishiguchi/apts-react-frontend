import React, { Component } from 'react';
import _       from 'lodash';
import request from 'axios';

// Components
import AppHeader    from './components/AppHeader/AppHeader';
import LngLatForm   from './components/LngLatForm/LngLatForm';
import Map          from './components/Map/Map';
import ListingTable from './components/ListingTable/ListingTable';

// Styles
import './App.css';

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
const PROP_TYPES = {
};
const DEFAULT_PROPS = {
  latitude  : 38.85,
  longitude : -77.2,
  zoom      : 9,
};

class App extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      listings          : [],
      fetchAllItemsError: null,
      latitude          : this.props.latitude,
      longitude         : this.props.longitude,
      zoom              : this.props.zoom,
    }
    // TODO: selectedItem
    // We want to render the app based on listings and selectedItem.

    _.bindAll(this, '_fetchAllItems');
  }

  render() {
    return (
      <div className="App">
        <AppHeader />

        <section className="grid">
          <div className="flexible">
            <LngLatForm
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              onChangeLongitude={this.onChangeLongitude}
              onChangeLatitude={this.onChangeLatitude}
            />
            <Map
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              zoom={this.state.zoom}
              listings={this.state.listings}
            />
          </div>
          <div className="flexible">
            <ListingTable listings={this.state.listings} />
          </div>
        </section>

      </div>
    );
  }

  componentDidMount() {
    this._fetchAllItems();
  }

  // Make a GET request to our Rails server.
  _fetchAllItems() {
    const propertiesUrl = "http://apts-api.herokuapp.com/properties.json";
    return (
      request
        .get(propertiesUrl, { responseType: 'json' })
        .then(res => {
          console.log(res);
          this.setState({ listings: res.data })
        })
        .catch(error => {
          console.log(error);
          this.setState({ fetchAllItemsError: error })
        })
    );
  }

  onChangeLatitude = (latitude) => {
    this.setState({ latitude: parseFloat(latitude) });
  };

  onChangeLongitude = (longitude) => {
    this.setState({ longitude: parseFloat(longitude) });
  };

} // end class

App.propTypes = PROP_TYPES;
App.defaultProps = DEFAULT_PROPS;

export default App;
