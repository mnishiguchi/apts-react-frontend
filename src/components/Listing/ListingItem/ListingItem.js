import React, { PropTypes as T } from 'react';
import { Link } from 'react-router'

const ListingItem = (props) => {
  const { place } = props;

  const onMouseOver = (event) => {
    props.emitter.emit( 'LISTING_ITEM_HOVERED', {place} );
  };

  return (
    <tr
      className="ListingItem"
      onMouseOver={onMouseOver}
    >
      <td>
        <Link to={`/detail/${place.id}`}>
          {place.marketing_name}
        </Link>
        <p>
          {`${place.street} ${place.city} ${place.state} ${place.zip}`}
        </p>
      </td>
    </tr>
  );
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingItem.propTypes = {
  emitter: T.object.isRequired
};

export default ListingItem;
