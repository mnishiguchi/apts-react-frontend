import React from 'react'
import PropTypes from 'prop-types'

const ListingItem = ({ place, emitter }) => {
  return (
    <div
      className="ListingItem"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        borderBottom: '1px solid #999',
        padding: '1rem 1rem',
        width: '100%',
        height: '60px',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      {`${place.street} ${place.city} ${place.state} ${place.zip}`}
    </div>
  )

  function onMouseOver(event) {
    emitter.emit('LISTING_ITEM_HOVERED', { place })
  }

  function onMouseLeave(event) {
    emitter.emit('LISTING_ITEM_MOUSE_LEAVE', { place })
  }
}

ListingItem.propTypes = {
  place: PropTypes.any.isRequired,
  emitter: PropTypes.object.isRequired,
}

export default ListingItem
