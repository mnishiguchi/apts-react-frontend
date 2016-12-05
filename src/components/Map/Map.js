import React, { Component } from 'react';

// Styles
import './Map.css';

// NPM:    https://www.npmjs.com/package/mapbox-gl
// Github: https://github.com/mapbox/mapbox-gl-js
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

function noop() {}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
const PROP_TYPES = {
  latitude  : React.PropTypes.number.isRequired,
  longitude : React.PropTypes.number.isRequired,
  zoom      : React.PropTypes.number.isRequired,
};
const DEFAULT_PROPS = {
  accessToken: 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag',
  width     : "100%",
  height    : "100vh",
};

class Map extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      isSupported: mapboxgl.supported(),
    }

    if (!this.state.isSupported) {
      this.componentDidMount         = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate        = noop;
    }
  }

  render() {
    const mapStyle = {
      width   : this.props.width,
      height  : this.props.height,
      position: 'relative',
    };

    return (
      <div
        className="mapboxMap"
        ref="mapboxMap"
        style={mapStyle}
      >
      </div>
    );
  }

  componentDidMount() {
    console.log(`Map::componentDidMount`);

    mapboxgl.accessToken = this.props.accessToken;

    // Create a map instance based on the specified initialCenter.
    const map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      style    : 'mapbox://styles/mapbox/light-v9',
      center   : [ this.props.longitude, this.props.latitude ],
      zoom     : this.props.zoom,
    });

    map.on('load', () => {
      this._setupMarkers(this.props.listings);
    });

    // Store the reference to the map instance.
    this._map = map;
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      width: this.props.width,
      height: this.props.height
    });
  }

  componentDidUpdate() {
    console.log(`Map::componentDidUpdate`);
    console.log(this.props.zoom);
    this._updateCenter([this.props.longitude, this.props.latitude], {
      zoom: this.props.zoom
    });
  }

  componentWillUnmount() {
    console.log(`Map::componentWillUnmount`);

    if (this._map) {
      this._map.remove();
    }
  }

  /**
   * Creates an array of marker point objects for the specified listings.
   * @param  {Array<Object>} listings an array of hashes with keys lngLat and description.
   * @return {Array<Object>} an array of markerpoint hashes
   */
  _createMarkers = (listings) => {
    console.log(`Map::_createMarkers`)

    let markers = [];
    for (let listing of listings) {

        if (!listing) continue;

        const markerHTML = `
          <h4>${listing.marketing_name}</h4>
          <p>${this._fullAddress(listing)}</p>
        `;

        markers.push({
            "type": "Feature",
            "properties": {
                "description": markerHTML,
                "iconSize"   : [20, 20],
                "icon"       : "circle"
            },
            "geometry": {
                "type"       : "Point",
                "coordinates": [ listing.longitude, listing.latitude ]
            }
        });
    }
    console.log(markers);

    return markers;
  }

  _getMap() {
    return this._map;
  }

  _fullAddress(listing) {
    return [
      listing.street,
      listing.city,
      listing.state,
      listing.zip,
    ].join(' ');
  }

  _setupMarkers = (listings) => {
    console.log(`Map::_setupMarkers`)

    // // Listings
    // https://www.mapbox.com/mapbox-gl-js/example/multiple-geometries/
    this._map.addSource("listings", {
      "type": "geojson",
      "data": {
        "type"    : "FeatureCollection",
        "features": this._createMarkers(listings),
      }
    });
    this._map.addLayer({
      "id"    : "listings",
      "type"  : "symbol",
      "source": "listings",
      "layout": {
        "icon-image"        : "{icon}-15",
        "icon-allow-overlap": true
      }
    });


    // Create a popup, but don't add it to the map yet.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // Show popup on mousemove.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._map.on('mousemove', event => {
      const features = this._map.queryRenderedFeatures(event.point, {
        layers: [ "listings" ]
      });

      this._map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
          this._popup.remove();
          return;
      }

      const marker = features[0];

      this._popup
        .setLngLat(marker.geometry.coordinates)
        .setHTML(marker.properties.description)
        .addTo(this._map);
    });
  }

  /**
   * Moves the center of the map to the specified lngLat.
   * @param  {Array<Float>} longitude and latitude of the map center
   * @param  {Object} opts  https://www.mapbox.com/mapbox-gl-js/api/#Map
   */
  _updateCenter = (lngLat, opts) => {
      console.log("Map::_updateCenter");
      console.log(lngLat);
      this._map.panTo(lngLat, opts);
  }
} // end class

Map.propTypes = PROP_TYPES;
Map.defaultProps = DEFAULT_PROPS;

export default Map;
