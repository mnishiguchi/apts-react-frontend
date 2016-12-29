import React from 'react';

const ListingPreview = (props) => {
  const { currentListing } = props;
  const listingPreviewStyle = {
    position  :'relative',
    top       :0,
    left      :0,
    background:getRandomColor(),
    width     :'100%',
    height    :'80px',
    color     :'white',
    padding   : "1rem",
    overflow  : 'auto'
  }

  return (
    (currentListing) ?
      <div
        className="ListingPreview"
        style={listingPreviewStyle}>
        <p>
          {currentListing.marketing_name}
        </p>
        <p>
          {[
            currentListing.street,
            currentListing.city,
            currentListing.state,
            currentListing.zip,
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
      color += letters[ Math.floor(Math.random() * 4) ];
  }
  return color;
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingPreview.propTypes = {
  // emitter: PropTypes.object.isRequired
};

export default ListingPreview;
