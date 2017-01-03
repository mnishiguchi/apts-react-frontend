import React from 'react';

// Components
import ListingPreview from './ListingPreview';
import ListingItem    from './ListingItem/ListingItem';

const Listing = (props) => {
  const {
    places,
    currentPlace,
    emitter
  } = props;

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
            {
              places.map( place => (
                <ListingItem
                  place={place}
                  key={place.id}
                  emitter={emitter}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listing;
