import React from 'react'
import PropTypes from 'prop-types'

/**
 * A list item for Listing component.
 */
const ListingItem = ({ place, emitter, active, index }) => {
  return (
    <div
      className="ListingItem"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        borderBottom: '1px solid #999',
        padding: '1rem 1rem',
        width: '100%',
        height: '80px',
        overflowX: 'auto',
        overflowY: 'hidden',
        background: active && '#53A5F7',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '.5rem' }}>
          <span className="badge">{index}</span>
        </div>
        <div style={{ flex: 1 }}>
          {`${place.street} ${place.city} ${place.state} ${place.zip}`}
        </div>
      </div>
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
  place:   PropTypes.any.isRequired,
  emitter: PropTypes.object.isRequired,
}

export default ListingItem
