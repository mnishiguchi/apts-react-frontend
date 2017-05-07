import React from 'react'
import PropTypes from 'prop-types'

/**
 * A list item for Listing component.
 */
const ListingItem = (props) => {
  const { active, index, onMouseOver, onClick, onMouseLeave, place } = props

  return (
    <div
      className="ListingItem"
      onClick={e => onClick(place)}
      onMouseOver={e => onMouseOver(place)}
      onMouseLeave={e => onMouseLeave(place)}
      style={{
        borderBottom: '1px solid #999',
        padding:      '1rem 1rem',
        width:        '100%',
        height:       '80px',
        overflowX:    'auto',
        overflowY:    'hidden',
        background:   active && '#53A5F7',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '.5rem' }}>
          <span className="badge badge-primary">{index}</span>
        </div>
        <div style={{ flex: 1 }}>
          {`${place.street} ${place.city} ${place.state} ${place.zip}`}
        </div>
      </div>
    </div>
  )
}

ListingItem.propTypes = {
  active:       PropTypes.any,
  index:        PropTypes.any,
  onMouseLeave: PropTypes.func,
  onMouseOver:  PropTypes.func,
  place:        PropTypes.any,
}

export default ListingItem
