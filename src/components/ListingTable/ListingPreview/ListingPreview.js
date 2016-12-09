import React, { PropTypes } from 'react';

// Styles
// import './ListingPreview.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingPreview = (props) => {

	const { hoveredItem } = props;

	// const onMouseOver = (event) => {
	// 	props.emitter.emit( 'ListingPreview:mouseOver', {listing} );
	// };

	// https://facebook.github.io/react/docs/events.html#mouse-events
	return (
		(hoveredItem) ?
			<div
				className="ListingPreview"
				style={{position:'relative', top:0, left:0}}
			>
				<div style={{'background':getRandomColor(), width:'100%', 'height':'140px', color:'white'}}>
					{hoveredItem.marketing_name}
				</div>
				<p>
					{[
						hoveredItem.street,
						hoveredItem.city,
						hoveredItem.state,
						hoveredItem.zip,
					].join(' ')}
				</p>
			</div> : <div style={{display:'none'}}></div>
	);
}

function getRandomColor() {
	// const letters = '0123456789ABCDEF';
	const letters = '0123';
	let color = '#';
	for (let i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 4)];
	}
	return color;
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingPreview.propTypes = {
  // emitter: PropTypes.object.isRequired
};

export default ListingPreview;
