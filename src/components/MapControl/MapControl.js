import React from 'react';

// Styles
import './MapControl.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const MapControl = (props) => {
  return (
    <form className="MapControl">
      <div>
        <strong>Listing count:</strong>{' '}
        <span className="text-muted">
          {props.listings.length}
        </span>
        {' / '}
        <strong>Bounds:</strong>{' '}
        <span className="text-muted">
          {JSON.stringify(props.bounds)}
        </span>
      </div>
      <label htmlFor="latitude">
        Latitude:
      </label>
      <input
        id="latitude"
        type="number"
        step="0.01"
        value={Number(props.center[1]).toFixed(1)}
        onChange={event => props.onChangeLatitude(event.target.value)}
      />
      {' / '}
      <label htmlFor="longitude">
        Longitude:
      </label>
      <input
        id="longitude"
        type="number"
        step="0.01"
        value={Number(props.center[0]).toFixed(1)}
        onChange={event => props.onChangeLongitude(event.target.value)}
      />
      {' / '}
      <label htmlFor="zoom">
        Zoom:
      </label>
      <input
        id="zoom"
        type="number"
        step="1"
        value={Number(props.zoom).toFixed(1)}
        onChange={event => props.onChangeZoom(event.target.value)}
      />
    </form>
  );
}

export default MapControl;
