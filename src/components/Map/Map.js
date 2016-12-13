import React, { Component } from 'react';

import L from 'leaflet';

// Styles
import 'leaflet/dist/leaflet.css';
import './Map.css';

class Map extends Component {

  constructor(props) {
    super(props);

    // Store references.
    this._map   = null;
    this._layer = null;
    // this._popup  = null;
    // this._source = null;
  }

  render() {
    const mapStyle = {
      width   : this.props.width,
      height  : this.props.height,
      position: 'relative',
    };

    return (
      <div
        id="mapId"
        className="map"
        ref="map"
        style={mapStyle}
      >
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._createMap()

    // Example: marker with popup.
    const marker = L.marker([38.8977, -77.0365])
      .addTo(this._map)
      .bindPopup("<b>Hello world!</b><br>I am a popup.")
      .on('click', (event) => {
        marker.openPopup();
      });

    // Example: Standalone popup.
    const popup = L.popup()
      .setLatLng([38.9, -77.1])
      .setContent("I am a standalone popup.")
      .openOn(this._map);

    // Listen for events on the map.
    this._map.on('dragend', (event) => {
      console.log(`Map:layer:dragend`);
    });
    this._map.on('click', (event) => {
      console.log(`Map:layer:click`);
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      width  : this.props.width,
      height : this.props.height,
    });
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    if (this._map) {
      // http://leafletjs.com/reference-1.0.2.html#map-remove
      this._map.remove();
    }
  }


  // ---
  // PRIVATE METHODS
  // ---


  _createMap = () => {
    const {center, zoom} = this.props;

    // http://leafletjs.com/reference-1.0.2.html#marker-l-marker
    this._map = L.map('mapId').setView(center, zoom);

    // TODO: replace this layer. with one from mapbox.
    // http://leafletjs.com/examples/quick-start/
    this._layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this._map);
  }

} // end class


// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Map.propTypes = {
  bounds : React.PropTypes.array,
  center : React.PropTypes.array,
  zoom   : React.PropTypes.number,
};
Map.defaultProps = {
  accessToken: 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag',
  width      : "100%",
  height     : "100vh",
};

export default Map;
