import React, { PropTypes as T } from 'react';
import DetailModal from './DetailModal/DetailModal';

// Styles
import './Listing.css';

const Listing = (props) => {
  const { listing } = props;

  const fullAddress = [
    listing.street,
    listing.city,
    listing.state,
    listing.zip,
  ].join(' ');

  const onMouseOver = (event) => {
    props.emitter.emit( 'Listing:mouseOver', {listing} );
  };

  return (
    <tr
      className="Listing"
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
Listing.propTypes = {
  emitter: T.object.isRequired
};

export default Listing;
