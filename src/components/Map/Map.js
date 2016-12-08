import React, { Component } from 'react';

// NPM:    https://www.npmjs.com/package/mapbox-gl
// Github: https://github.com/mapbox/mapbox-gl-js
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

// Styles
import './Map.css';

function noop() {}

class Map extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      isSupported: mapboxgl.supported(),
    }

    // If mapbox is not supported, do nothing.
    if (!this.state.isSupported) {
      this.componentDidMount         = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate        = noop;
    }

    // Store references.
    this._map    = null;
    this._popup  = null;
    this._source = null;
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


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    console.log(`Map::componentDidMount`);

    // Create a map instance based on props.
    this._map = this._createMap()

    // Set up initial markers.
    this._map.on('load', () => {
      this._setupMarkers(this.props.listings);
    });

    // Detect zoom changes.
    this._map.on('zoomend', (event) => {
      this.props.emitter.emit( 'Map:move', {
        zoom     : this._map.getZoom(),
        longitude: this._map.getCenter()['lng'],
        latitude : this._map.getCenter()['lat'],
      });
    });

    // Detect zoom changes.
    this._map.on('dragend', (event) => {
      this.props.emitter.emit( 'Map:move', {
        zoom     : this._map.getZoom(),
        longitude: this._map.getCenter()['lng'],
        latitude : this._map.getCenter()['lat'],
      });
    });
  }

  componentWillReceiveProps(newProps) {
    console.log(`Map::componentWillReceiveProps`);
    // console.log(newProps);

    this.setState({
      width  : this.props.width,
      height : this.props.height,
    });
  }

  componentWillUpdate() {
    // console.log(`Map::componentWillUpdate`);
  }

  componentDidUpdate() {
    console.log(`Map::componentDidUpdate`);
    // console.log(this.props);
    // console.log(this.props.listings);

    this._updateMarkers(this.props.listings);

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


  // ---
  // PRIVATE METHODS
  // ---


  _createMap = () => {
    mapboxgl.accessToken = this.props.accessToken;

    return new mapboxgl.Map({
      container: this.refs.mapboxMap,
      style    : 'mapbox://styles/mapbox/light-v9',
      center   : [ this.props.longitude, this.props.latitude ],
      zoom     : this.props.zoom,
    });
  }

  /**
   * Creates an array of marker point objects for the specified listings.
   * @param  {Array<Object>} listings an array of hashes with keys lngLat and description.
   * @return {Array<Object>} an array of markerpoint hashes
   */
  _createMarkers = (listings) => {
    console.log(`Map::_createMarkers`)

    let jsonMarkers = [];
    for (let listing of listings) {

      // Ignore if listing is blank.
      if (!listing) continue;

      // If listing does not have a marker, create one.
      if (!listing.marker) {
        listing.marker = this._listingToMarker(listing);
      }

      // Update the mnMarkerType property.
      const mnMarkerType = (this.props.hoveredItem === listing) ? "hovered" : "default";
      listing.marker["properties"]["mnMarkerType"] = mnMarkerType;

      jsonMarkers.push(listing.marker)
    }

    // console.log(jsonMarkers);

    return jsonMarkers;
  }

  _fullAddress = (listing) => {
    return [
      listing.street,
      listing.city,
      listing.state,
      listing.zip,
    ].join(' ');
  }

  _getMap = () => {
    return this._map;
  }

  _listingToMarker = (listing) => {
    const markerHTML = `
      <h4>${listing.marketing_name}</h4>
      <p>${this._fullAddress(listing)}</p>
    `;

    const coordinates = [ listing.longitude, listing.latitude ];
    return {
        "type": "Feature",
        "properties": {
            "description" : markerHTML,
            "iconSize"    : [20, 20],
            "icon"        : "circle",
            "listing"     : {...listing},  // Add a copy of listing
        },
        "geometry": {
            "type"       : "Point",
            "coordinates": coordinates
        }
    };
  }

  _setupMarkers = (listings) => {
    console.log(`Map::_setupMarkers`)

    if (this._map.getSource("listings")) {
      this._map.removeSource("listings")
    }

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
      "source": "listings",
      "type"  : "circle",
      'paint': {
          // make circles larger as the user zooms from z12 to z22
          'circle-radius': {
              'base': 1.75,
              'stops': [
                [12, 5],
                [22, 180]
              ]
          },
          // color circles by property, using data-driven styles
          'circle-color': {
              property: 'mnMarkerType',
              type    : 'categorical',
              stops   : [
                ['default', '#666666'],
                ['hovered', '#e55e5e'],
              ]
          }
      }
    });

    // this._map.addLayer({
    //   "id"    : "listings",
    //   "type"  : "symbol",
    //   "source": "listings",
    //   "layout": {
    //     "icon-image"        : "{icon}-15",
    //     "icon-allow-overlap": true
    //   }
    // });

    // Create a popup, but don't add it to the map yet.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // Show popup on mousemove.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._map.on('mousemove', event => {
      this._showPopupAtPoint(event.point);
    });
  }

  /**
   * Calling this with zero arguments, or with only a parameters argument is
   * equivalent to passing a bounding box encompassing the entire map viewport.
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  _showPopupAtPoint = (point) => {
    const features = this._map.queryRenderedFeatures(point, {
      layers: [ "listings" ]
    });

    this._map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    // If any feature exists on the specified point, just remove the displayed popuup
    // and do nothing else.
    if (!features.length) {
      this._popup.remove();
      return;
    }

    // Get the best feature for the marker.
    const marker = features[0];

    // Notify App with 'Map:popup' event.
    // console.log(marker['properties']['listing']);
    this.props.emitter.emit( 'Map:popup', {
      listing: marker['properties']['listing']
    });

    this._popup
      .setLngLat(marker.geometry.coordinates)
      .setHTML(marker.properties.description)
      .addTo(this._map);
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

  _updateMarkers = (listings) => {
    console.log("Updating Markers");

    // Do nothing if the listings source does not exist on the map.
    if (!this._map.getSource("listings")) return;

    // Update data on the source.
    this._map.getSource("listings").setData({
      "type"    : "FeatureCollection",
      "features": this._createMarkers(listings),
    });
  }

} // end class


// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Map.propTypes = {
  latitude  : React.PropTypes.number.isRequired,
  longitude : React.PropTypes.number.isRequired,
  zoom      : React.PropTypes.number.isRequired,
};
Map.defaultProps = {
  accessToken: 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag',
  width      : "100%",
  height     : "100vh",
};

export default Map;
