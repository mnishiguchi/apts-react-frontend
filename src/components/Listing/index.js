import React from 'react'
import { AutoSizer, List }      from 'react-virtualized';

import ListingPreview from './ListingPreview'
import ListingItem    from './ListingItem'

const Listing = (props) => {
  const {
    places,
    currentPlace,
    emitter
  } = props

  // console.info(places)

  return (
    <div className="Listing">

      <ListingPreview currentPlace={currentPlace} />

      <div className="table-responsive" style={{overflowY: 'auto', maxHeight: '70vh'}}>
        <table className="table table-bordered">
          <tbody>
            {
              places.map(place => (
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
  )
}

export default Listing
