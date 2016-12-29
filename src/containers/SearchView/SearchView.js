import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { EventEmitter }     from 'fbemitter';

import actions from '../../actions'

// Components
import Map           from '../../components/Map/Map';
import ListingTable  from '../../components/ListingTable/ListingTable';

// Styles
import './SearchView.css';

class SearchView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchView grid">
        <div className="flexible">

          <ListingTable
            {...this.props}
            emitter={this.emitter}
            />

        </div>
        <div className="flexible">

          <Map
            {...this.props}
            emitter={this.emitter}
          />

        </div>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter for this container.
    this.emitter = new EventEmitter();

    this.emitter.addListener( 'Map:popup', payload => {
      this.props.dispatch(
        actions.listing.setCurrentListing(payload.listing)
      );
    });
    this.emitter.addListener( 'Map:move', payload => {
      this.props.dispatch(
        actions.map.update(payload)
      );
    });
    this.emitter.addListener( 'Listing:mouseOver', payload => {
      this.props.dispatch(
        actions.listing.setCurrentListing(payload.listing)
      );
    });
    // this.emitter.addListener( 'MapControl:longitude:change', payload => {
    //   this.props.dispatch(
    //     actions.map.updateLongitude(payload.longitude)
    //   );
    // });
    // this.emitter.addListener( 'MapControl:latitude:change', payload => {
    //   this.props.dispatch(
    //     actions.map.updateLongitude(payload.latitude)
    //   );
    // });
    // this.emitter.addListener( 'MapControl:zoom:change', payload => {
    //   this.props.dispatch(
    //     actions.map.updateZoom(payload.zoom)
    //   );
    // });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(
      actions.listing.fetchAllListings()
    );
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }
} // end class

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
SearchView.propTypes    = {};
SearchView.defaultProps = {};

const mapStateToProps = function(store) {
  return {
    listings      : store.listing['listings'],
    currentListing: store.listing['currentListing'],
    bounds        : store.listing['bounds'],
    center        : store.listing['center'],
    zoom          : store.listing['zoom'],
  };
}

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
