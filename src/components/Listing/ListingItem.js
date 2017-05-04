import React, { PropTypes as T } from 'react'

const ListingItem = (props) => {
  const { place } = props

  function onMouseOver(event) {
    props.emitter.emit( 'LISTING_ITEM_HOVERED', {place} )
  }

  function onMouseLeave(event) {
    props.emitter.emit( 'LISTING_ITEM_MOUSE_LEAVE', {place} )
  }

  return (
    <tr
      className="ListingItem"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <td>
        <p>
          {`${place.street} ${place.city} ${place.state} ${place.zip}`}
        </p>
      </td>
    </tr>
  )
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingItem.propTypes = {
  emitter: T.object.isRequired
}

export default ListingItem
