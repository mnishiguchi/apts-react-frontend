import React from 'react';

const ListingPreview = (props) => {
  const { currentPlace } = props;

  const style = {
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
    (currentPlace) ?
      <div
        className="ListingPreview"
        style={style}>
        <p>
          {currentPlace.marketing_name}
        </p>
        <p>
          {[
            currentPlace.street,
            currentPlace.city,
            currentPlace.state,
            currentPlace.zip,
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
