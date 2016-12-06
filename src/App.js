import React, { Component } from 'react';
import request              from 'axios';
import _                    from 'lodash';
import { EventEmitter }     from 'fbemitter';
import NotificationSystem   from 'react-notification-system';

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
    // We want to render the app based on listings and selectedItem.
    this.state = {
      listings          : [],
      hoveredItem       : null,
      fetchAllItemsError: null,
      latitude          : this.props.latitude,
      longitude         : this.props.longitude,
      zoom              : this.props.zoom,
      // showDetail        : false,
    }

    this._notificationSystem = null;

    _.bindAll(this, '_fetchAllItems');
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter.
    this.emitter = new EventEmitter;

    // Register and listen for our custom events that will be emitted by children.
    this._listenForChildren();
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

    return (
      <div className="App">
        <AppHeader />

        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyles}
        />

      <div className="alert alert-info" style={{'margin':0}}>
          <div>
            <strong>
              Active item: &nbsp;
            </strong>
            <span className="text-muted">
              {(this.state.hoveredItem) ? this.state.hoveredItem.marketing_name : '(hover the list)'}
            </span>
          </div>

          <LngLatForm
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={this.state.zoom}
            onChangeLongitude={this.onChangeLongitude}
            onChangeLatitude={this.onChangeLatitude}
            onChangeZoom={this.onChangeZoom}
            />
        </div>


        <section className="grid">
          <div className="flexible">
            <Map
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              zoom={this.state.zoom}
              listings={this.state.listings}
              hoveredItem={this.state.hoveredItem}
              emitter={this.emitter}
            />
          </div>
          <div className="flexible">
            <ListingTable
              listings={this.state.listings}
              hoveredItem={this.state.hoveredItem}
              emitter={this.emitter}
            />
          </div>
        </section>
      </div>
    );
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
  _fetchItems(url) {
    return (
      request
        .get(url, { responseType: 'json' })
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

  _fetchAllItems() {
    const url = "http://apts-api.herokuapp.com/properties.json";
    this._fetchItems(url)
  }

  // Make a GET request to our Rails server.
  _fetchItemsByKeyword(q) {
    const url = `http://apts-api.herokuapp.com/properties.json?q=${q}`;
    this._fetchItems(url)
  }

  _listenForChildren() {
    // this.emitter.addListener( 'DetailScreen:open', payload => {
    //   console.log( 'DetailScreen:open' );
    //   this.setState({ showDetail: true });
    //
    //   this._addNotification( 'DetailScreen:open' );
    // });
    // this.emitter.addListener( 'DetailScreen:close', payload => {
    //   console.log( 'DetailScreen:close' );
    //
    //   this._addNotification( 'DetailScreen:close' );
    // });
    // this.emitter.addListener( 'ListingItem:click', payload => {
    //   console.log( 'ListingItem:click' );
    //
    //   this._addNotification( `Clicked: ${payload.item.marketing_name}` );
    // });
    this.emitter.addListener( 'ListingItem:mouseOver', payload => {
      // console.log( 'ListingItem:mouseOver' );

      // this._addNotification( `Hovered: ${payload.item.marketing_name}` );
      this.setState({ hoveredItem: payload.item });
    });
  }

} // end class

App.propTypes = PROP_TYPES;
App.defaultProps = DEFAULT_PROPS;

export default App;
