import React, {Component} from 'react';
import { connect } from 'react-redux';
import { EventEmitter } from 'fbemitter';

// import store          from '../../store';
import listingActions from '../../actions/listing'

// Components
import Listing        from './Listing/Listing';
import ListingPreview from './ListingPreview/ListingPreview';

class ListingTable extends Component {

  constructor(props) {
    super(props);
    // this.state = {}
  }

  render() {
    const { listings } = this.props;
    const itemNodes = listings.map( listing =>
      <Listing
        listing={listing}
        key={listing.id}
        emitter={this.emitter}
      />
    );

    return (
      <div
        className="ListingTable"
        style={{padding: '0 1.5rem'}}>

        <ListingPreview {...this.props} />

        <div
          className="table-responsive"
          style={{overflowY: 'auto', maxHeight: '70vh'}}>
          <table className="table table-bordered">
            <tbody>
              {itemNodes}
            </tbody>
          </table>
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
    // Create a emitter.
    this.emitter = new EventEmitter();

    // Register and listen for our custom events that will be emitted by children.
    this.emitter.addListener( 'Listing:mouseOver', payload => {
      const { dispatch } = this.props;
      dispatch(listingActions.setCurrentListing(payload.listing));
    });
  }
} // end class


const mapStateToProps = function(store) {
  return {
    listings      : store.listing['listings'],
    currentListing: store.listing['currentListing'],
  };
}

export default connect(mapStateToProps)(ListingTable);
