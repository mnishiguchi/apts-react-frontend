import React from 'react';

// Components
import ListingPreview from './ListingPreview';
import ListingItem    from './ListingItem/ListingItem';

const Listing = (props) => {
  const {
    listings,
    currentPlace,
    emitter
  } = props;

  const listingNodes = listings.map( listing =>
    <ListingItem
      listing={listing}
      key={listing.id}
      emitter={emitter}
    />
  );

  return (
    <div
      className="Listing"
      style={{padding: '0 1.5rem'}}>

      <ListingPreview currentPlace={currentPlace} />

      <div
        className="table-responsive"
        style={{overflowY: 'auto', maxHeight: '70vh'}}>
        <table className="table table-bordered">
          <tbody>
            {listingNodes}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listing;
