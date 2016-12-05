import React from 'react';

// Styles
import './LngLatForm.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const LngLatForm = (props) => {
  return (
    <form className="LngLatForm">
      <label htmlFor="latitude">
        Latitude:
      </label>
      <input
        id="latitude"
        type="number"
        step="0.01"
        value={props.latitude}
        onChange={event => props.onChangeLatitude(event.target.value)}
      />
      {" "}
      <label htmlFor="longitude">
        Longitude:
      </label>
      <input
        id="longitude"
        type="number"
        step="0.01"
        value={props.longitude}
        onChange={event => props.onChangeLongitude(event.target.value)}
      />
    </form>
  );
}

export default LngLatForm;
