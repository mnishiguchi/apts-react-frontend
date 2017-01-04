import React, { PropTypes as T } from 'react';
import DetailModal from './DetailModal/DetailModal';

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
        <DetailModal place={place}>
          {place.marketing_name}
        </DetailModal>
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
