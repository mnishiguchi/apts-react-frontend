import React from 'react';

// Components
import Listing        from './Listing/Listing';
import ListingPreview from './ListingPreview/ListingPreview';

const ListingTable = (props) => {
  const { listings, emitter } = props;

  const itemNodes = listings.map( listing =>
    <Listing
      listing={listing}
      key={listing.id}
      emitter={emitter}
    />
  );

  return (
    <div
      className="ListingTable"
      style={{padding: '0 1.5rem'}}>

      <ListingPreview {...props} />

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

export default ListingTable;
