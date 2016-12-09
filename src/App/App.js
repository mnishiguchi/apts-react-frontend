import React, { Component } from 'react';
import { browserHistory }  from 'react-router';

import request             from 'axios';
import _                   from 'lodash';
import { EventEmitter }    from 'fbemitter';
import NotificationSystem  from 'react-notification-system';

// Components
import AppHeader  from './AppHeader/AppHeader';
import AppFooter  from './AppFooter/AppFooter';

// Styles
import './App.css';

// Data
import defaultListings from '../default_listings.json';

class App extends Component {

  constructor(props) {
    super(props);

    // Initial state
    // We want to render the app based on listings and selectedItem.
    this.state = {
      listings          : [],
      hoveredItem       : null,
      center            : [-77.2, 38.85], // Will be updated with search result
      bounds            : {},             // Will be updated with search result
      zoom              : 2.5,
      fetchAllItemsError: null,
    }

    this._notificationSystem = null;

    // _.bindAll(this, '_fetchAllItems', '_fetchItemsByKeyword');
  }

  render() {
    const notificationStyles = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          zIndex    : 10,
          fontSize  : '20px',
          background: 'rgba(22, 82, 124, 0.8)',
          color     : 'rgb(202,178,161)'
        }
      }
    };

    const propsForChildren = {
      ...this.state,
      onChangeLongitude: this.onChangeLongitude,
      onChangeLatitude : this.onChangeLatitude,
      onChangeZoom     : this.onChangeZoom,
      emitter          : this.emitter,
    }

    // http://stackoverflow.com/a/35102287/3837223
    return (
      <div className="App">
        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyles}
        />

      <AppHeader emitter={this.emitter} />
        <main>
          {React.cloneElement(this.props.children, propsForChildren)}
        </main>
        <AppFooter />
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter.
    this.emitter = new EventEmitter();

    // Register and listen for our custom events that will be emitted by children.
    this._listenForChildren();
  }

  componentDidMount() {
    console.log(`App::componentDidMount`);

    this._fetchAllItems();

    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUpdate() {
    console.log(`App::componentWillUpdate`);
    console.log(this.state)
  }

  componentWillUnmount() {
    console.log(`App::componentWillUnmount`);
    this.emitter.removeAllListeners();
  }


  // ---
  // PUBLIC METHODS
  // ---


  onChangeLatitude = (latitude) => {
    this.setState({ center: [ this.state.center[0], parseFloat(latitude) ] });
  };

  onChangeLongitude = (longitude) => {
    this.setState({ center: [ parseFloat(longitude), this.state.center[1] ] });
  };

  onChangeZoom = (zoom) => {
    this.setState({ zoom: parseFloat(zoom) });
  };


  // ---
  // PRIVATE METHODS
  // ---


  _addNotification = ( message ) => {
    this._notificationSystem.addNotification({
      message: message,
      level:   'success'
    });
  }

  // Make a GET request to our Rails server.
  _fetchItems = (url) => {
    return (
      request
        .get(url, { responseType: 'json' })
        .then(res => {
          console.log(res);

          // NOTE: for now, if the fetched data is empty, we use hardcoded json instead.
          const listings = (res.data.length > 0) ? res.data : defaultListings;

          this.setState({
            listings:  listings,
            center:    [ listings[0].longitude, listings[0].latitude ],
          })
        })
        .catch(error => {
          console.log(error);
          this.setState({
            listings          : defaultListings,
            fetchAllItemsError: error,
          })
        })
    );
  }

  _fetchAllItems = () => {
    const url = "https://apts-app.herokuapp.com/properties.json";
    console.log(url)
    this._fetchItems(url)
  }

  // Make a GET request to our Rails server.
  _fetchItemsByKeyword = (q) => {
    const url = `https://apts-app.herokuapp.com/properties.json?q=${q}`;
    console.log(url)
    this._fetchItems(url)
  }

  _listenForChildren = () => {
    this.emitter.addListener( 'Listing:mouseOver', payload => {
      this.setState({ hoveredItem: payload.listing });
    });

    this.emitter.addListener( 'Map:popup', payload => {
      this.setState({ hoveredItem: payload.listing });
    });

    this.emitter.addListener( 'Map:move', payload => {
      this.setState({
        bounds : payload.bounds,
        center : payload.center,
        zoom   : payload.zoom,
      });
    });

    this.emitter.addListener( 'SearchBar:submit', payload => {
      // this._addNotification( `Submit search for "${payload.q}"` );

      this._fetchItemsByKeyword(payload.q);

      // Redirect to the search page.
      browserHistory.push('/search');
    });
  }

} // end class

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
App.propTypes = {};
App.defaultProps = {};

export default App;
