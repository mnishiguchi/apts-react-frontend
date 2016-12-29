import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { EventEmitter }     from 'fbemitter';

import actions from '../../actions'

// Components
import Map      from '../../components/Map/Map';
import Listing  from '../../components/Listing/Listing';

class SearchView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchView row">
        <div className="col-sm-4" style={{ padding: 0 }}>

          <Listing
            {...this.props}
            emitter={this.emitter}
          />

        </div>
        <div className="col-sm-8" style={{ padding: 0 }}>

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

    this.emitter.addListener('MAP_MARKER_HOVERED', payload => {
      this.props.dispatch(
        actions.listing.setCurrentListing(payload.listing)
      );
    });

    this.emitter.addListener('MAP_MOVED', payload => {
      this.props.dispatch(
        actions.map.update(payload)
      );
    });

    this.emitter.addListener('LISTING_ITEM_HOVERED', payload => {
      this.props.dispatch(
        actions.listing.setCurrentListing(payload.listing)
      );
    });
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
