import React, { PropTypes as T } from 'react';
import DetailModal from './DetailModal/DetailModal';

const ListingItem = (props) => {
  const { listing } = props;

  const fullAddress = [
    listing.street,
    listing.city,
    listing.state,
    listing.zip,
  ].join(' ');

  const onMouseOver = (event) => {
    props.emitter.emit( 'LISTING_ITEM_HOVERED', {listing} );
  };

  return (
    <tr
      className="ListingItem"
      onMouseOver={onMouseOver}
    >
      <td>
        <DetailModal listing={listing}>
          {listing.marketing_name}
        </DetailModal>
        <p>
          {fullAddress}
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
