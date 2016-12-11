import React, { PropTypes } from 'react';
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

	// https://facebook.github.io/react/docs/events.html#mouse-events
	return (
		<tr
			className="Listing"
			onMouseOver={onMouseOver}
		>
			<td>
        {listing.marketing_name}
      </td>
			<td>
        {fullAddress}
      </td>
			<td>
        <DetailModal
          text={'details'}
          listing={listing}
          />
			</td>
		</tr>
	);
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
Listing.propTypes = {
  emitter: PropTypes.object.isRequired
};

export default Listing;
