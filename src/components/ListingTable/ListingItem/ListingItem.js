import React, { PropTypes } from 'react';
import DetailModal from './DetailModal/DetailModal';

// Styles
import './ListingItem.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingItem = (props) => {

	const { item } = props;

	const fullAddress = [
		item.street,
		item.city,
		item.state,
		item.zip,
	].join(' ');

	// const onClick = (event) => {
	// 	props.emitter.emit( 'ListingItem:click', {item: item} );
	// };

	const onMouseOver = (event) => {
		props.emitter.emit( 'ListingItem:mouseOver', {item: item} );
	};

	// https://facebook.github.io/react/docs/events.html#mouse-events
	return (
		<tr
			className="ListingItem"
			onMouseOver={onMouseOver}
		>
			<td>
        {item.marketing_name}
      </td>
			<td>
        {fullAddress}
      </td>
			<td>
        <DetailModal
          text={'details'}
          item={item}
          />
			</td>
		</tr>
	);
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingItem.propTypes = {
  emitter: PropTypes.object.isRequired
};

export default ListingItem;
