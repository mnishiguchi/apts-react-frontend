import React from 'react';

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

	return (
		<tr className="ListingItem">
			<td>{item.marketing_name}</td>
			<td>{fullAddress}</td>
			<td>{item.contact_phone}</td>
		</tr>
	);
}

export default ListingItem;
