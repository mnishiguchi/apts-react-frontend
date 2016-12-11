import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { browserHistory }   from 'react-router';

import NotificationSystem  from 'react-notification-system';

import listingActions from '../../actions/listing'

// Components
import AppHeader  from '../../containers/AppHeader/AppHeader';

// Styles
import './MainLayout.css';

// Hardcoded data for develpment purposes.
import defaultListings from '../../default_listings.json';

// The root node of this app.
// TODO: App will be a simple container and all the logic will be moved to redux.
class MainLayout extends Component {

  constructor(props) {
    super(props);

    // Initial state
    // We want to render the app based on listings and selectedItem.
    this.state = {
      // center : [-77.2, 38.85], // Will be updated with search result
      // bounds : [], // Will be updated with search result
      // zoom   : 2.5,
    }

    // Usage: this._addNotification( `Submit search for "${payload.q}"` );
    this._notificationSystem = null;
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

    // Props that we want to pass to children.
    const propsForChildren = {
      ...this.props,
      ...this.state,
      emitter : this.emitter,
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

        <footer className="AppFooter">
          <div className="container">
            <div className="contact-info">
              Masatoshi Nishiguchi &middot;
              <a href="http://www.mnishiguchi.com/">
                mnishiguchi.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listingActions.fetchAll());

    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }


  // ---
  // PRIVATE METHODS
  // ---


  _addNotification = ( message ) => {
    this._notificationSystem.addNotification({
      message: message,
      level:   'success'
    });
  }
} // end class

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
MainLayout.propTypes    = {};
MainLayout.defaultProps = {};

const mapStateToProps = function(store) {
  return {
    listings      : store.listing['listings'],
    currentListing: store.listing['currentListing'],
    bounds        : store.map['bounds'],
    center        : store.map['center'],
    zoom          : store.map['zoom'],
  };
}

export default connect(mapStateToProps)(MainLayout);
