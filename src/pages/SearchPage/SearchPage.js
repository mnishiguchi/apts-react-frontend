import React, { Component } from 'react';
import request              from 'axios';
import _                    from 'lodash';
import { EventEmitter }     from 'fbemitter';
import NotificationSystem   from 'react-notification-system';

// https://react-bootstrap.github.io/components.html#navigation
import Button       from 'react-bootstrap/lib/Button';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Navbar       from 'react-bootstrap/lib/Navbar';

// Components
import AppHeader    from '../../layout/AppHeader/AppHeader';
import LngLatForm   from '../../components/LngLatForm/LngLatForm';
import Map          from '../../components/Map/Map';
import ListingTable from '../../components/ListingTable/ListingTable';

// Styles
import './SearchPage.css';

// data
import defaultListings from '../../default_listings.json';

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
const PROP_TYPES = {
};
const DEFAULT_PROPS = {
  latitude  : 38.85,
  longitude : -77.2,
  zoom      : 9,
  listings  : defaultListings,
};

class SearchPage extends Component {

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
    this.emitter = new EventEmitter();

    // Register and listen for our custom events that will be emitted by children.
    this._listenForChildren();
  }

  render() {
    const notificationStyles = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // SearchPagelied to every notification, regardless of the notification level
          zIndex    : 10,
          fontSize  : '20px',
          background: 'rgba(22, 82, 124, 0.8)',
          color     : 'rgb(202,178,161)'
        }
      }
    };

    return (
      <div className="SearchPage">
        <AppHeader>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button className="hidden-xs" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </Navbar.Form>
        </AppHeader>

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
    console.log(`SearchPage::componentDidMount`);

    this._fetchAllItems();

    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUpdate() {
    console.log(`SearchPage::componentWillUpdate`);
  }

  componentWillUnmount() {
    console.log(`SearchPage::componentWillUnmount`);
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
    const url = "http://apts-api.herokuapp.com/properties.json";
    this._fetchItems(url)
  }

  // Make a GET request to our Rails server.
  _fetchItemsByKeyword = (q) => {
    const url = `http://apts-api.herokuapp.com/properties.json?q=${q}`;
    this._fetchItems(url)
  }

  _listenForChildren = () => {
    this.emitter.addListener( 'ListingItem:mouseOver', payload => {
      // console.log( 'ListingItem:mouseOver' );

      // this._addNotification( `Hovered: ${payload.item.marketing_name}` );
      this.setState({ hoveredItem: payload.item });
    });
  }

} // end class

SearchPage.propTypes = PROP_TYPES;
SearchPage.defaultProps = DEFAULT_PROPS;

export default SearchPage;
