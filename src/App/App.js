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
      fetchAllItemsError: null,
      latitude          : this.props.latitude,
      longitude         : this.props.longitude,
      zoom              : this.props.zoom,
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
  }

  componentWillUnmount() {
    console.log(`App::componentWillUnmount`);
    this.emitter.removeAllListeners();
  }


  // ---
  // PUBLIC METHODS
  // ---


  onChangeLatitude = (latitude) => {
    this.setState({ latitude: parseFloat(latitude) });
  };

  onChangeLongitude = (longitude) => {
    this.setState({ longitude: parseFloat(longitude) });
  };

  onChangeZoom = (zoom) => {
    this.setState({ zoom: parseFloat(zoom) });
  };


  // ---
  // PRIVATE METHODS
  // ---


  _addNotification( message ) {
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

          this.setState({ listings: listings })
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
    this._fetchItems(url)
  }

  // Make a GET request to our Rails server.
  _fetchItemsByKeyword = (q) => {
    const url = `https://apts-app.herokuapp.com/properties.json?q=${q}`;
    console.log(url)
    this._fetchItems(url)
  }

  _listenForChildren = () => {
    this.emitter.addListener( 'ListingItem:mouseOver', payload => {
      // console.log( 'ListingItem:mouseOver' );

      // this._addNotification( `Hovered: ${payload.item.marketing_name}` );
      this.setState({ hoveredItem: payload.item });
    });

    this.emitter.addListener( 'SearchBar:submit', payload => {
      // console.log( 'SearchBar:submit' );

      this._addNotification( `Submit search for "${payload.q}"` );

      // TODO: Actually hit the app server for searching...
      this._fetchItemsByKeyword(payload.q);

      // Redirect to the search page.
      browserHistory.push('/search');
    });
  }

} // end class

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
App.propTypes = {};
App.defaultProps = {
  latitude  : 38.85,
  longitude : -77.2,
  zoom      : 9,
  listings  : defaultListings,
};

export default App;
