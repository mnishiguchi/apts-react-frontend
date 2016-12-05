import React from 'react';

// Styles
import './ListingItem.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingItem = (props) => {
	return (
		<tr className="ListingItem">
			<td>Table cell</td>
			<td>Table cell</td>
			<td>Table cell</td>
		</tr>
	);
}

export default ListingItem;
