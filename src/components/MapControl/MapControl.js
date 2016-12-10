import React from 'react';

// Styles
import './MapControl.css';

const MapControl = (props) => {
  const {
    listings, bounds, center, zoom, emitter
  } = props;

  return (
    <form className="MapControl">
      <div>
        <strong>Listing count:</strong>{' '}
        <span className="text-muted">
          {listings.length}
        </span>
        {' / '}
        <strong>Bounds:</strong>{' '}
        <span className="text-muted">
          {JSON.stringify(bounds)}
        </span>
      </div>
      <label htmlFor="longitude">
        Longitude:
      </label>
      <input
        id="longitude"
        type="number"
        step="0.5"
        value={Number(center[0]).toFixed(1)}
        onChange={event => {
          emitter.emit( 'MapControl:longitude:change', { longitude: event.target.value } );
        }}
      />
      {' / '}
      <label htmlFor="latitude">
        Latitude:
      </label>
      <input
        id="latitude"
        type="number"
        step="0.5"
        value={Number(center[1]).toFixed(1)}
        onChange={event => {
          emitter.emit( 'MapControl:latitude:change', { latitude: event.target.value } );
        }}
      />
      {' / '}
      <label htmlFor="zoom">
        Zoom:
      </label>
      <input
        id="zoom"
        type="number"
        step="0.5"
        value={Number(zoom).toFixed(1)}
        onChange={event => {
          emitter.emit( 'MapControl:zoom:change', { zoom: event.target.value } );
        }}
      />
    </form>
  );
}

export default MapControl;
