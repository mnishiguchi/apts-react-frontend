import React from 'react';

// Components
import ListingItem    from './ListingItem/ListingItem';
import ListingPreview from './ListingPreview/ListingPreview';

const ListingTable = (props) => {
  const {
    listings,
    currentListing,
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
      className="ListingTable"
      style={{padding: '0 1.5rem'}}>

      <ListingPreview currentListing={currentListing} />

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

export default ListingTable;
