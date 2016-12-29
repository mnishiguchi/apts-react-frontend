import React, { Component, PropTypes as T } from 'react';

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
    // Create a map instance based on props.
    this._map = this._createMap()

    // Set up initial markers.
    this._map.on('load', () => {
      this._setupMarkers(this.props.listings);
    });

    // Detect zoom.
    this._map.on('zoomend', (event) => {
      const payload = this._getMapData()
      this.props.emitter.emit( 'MAP_MOVED', payload );
    });

    // Detect drag.
    this._map.on('dragend', (event) => {
      const payload = this._getMapData()
      this.props.emitter.emit( 'MAP_MOVED', payload );
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      width  : this.props.width,
      height : this.props.height,
    });
  }

  componentWillUpdate() {}

  componentDidUpdate() {
    const { listings, center, zoom } = this.props;

    this._updateCenter(center, { zoom });
    this._updateMarkers(listings);
    this._showPopupForCurrentListing();
  }

  componentWillUnmount() {
    if (this._map) { this._map.remove(); }
  }


  // ---
  // PRIVATE METHODS
  // ---


  _configureInfoWindowHTML(listing) {
    return `
      <h4>${listing.marketing_name}</h4>
      <p>${fullAddress(listing)}</p>
    `

    function fullAddress(listing) {
      return [
        listing.street,
        listing.city,
        listing.state,
        listing.zip,
      ].join(' ');
    }
  }

  _createMap() {
    mapboxgl.accessToken = this.props.accessToken;

    return new mapboxgl.Map({
      container: this.refs.mapboxMap,
      style    : 'mapbox://styles/mapbox/light-v9',
      center   : this.props.center,
      zoom     : this.props.zoom,
    });
  }

  /**
   * Creates an array of marker point objects for the specified listings.
   * @param  {Array<Object>} listings an array of hashes with keys lngLat and description.
   * @return {Array<Object>} an array of markerpoint hashes
   */
  _createMarkers(listings) {
    let jsonMarkers = [];
    for (let listing of listings) {

      // Ignore if listing is blank.
      if (!listing) continue;

      // If listing does not have a marker, create one.
      if (!listing.marker) {
        listing.marker = this._listingToMarker(listing);
      }

      // Update the mnMarkerType property.
      const mnMarkerType = (this.props.currentListing === listing) ? "hovered" : "default";
      listing.marker["properties"]["mnMarkerType"] = mnMarkerType;

      jsonMarkers.push(listing.marker)
    }

    return jsonMarkers;
  }

  /**
   * Formats the bounds.
   * @param  {Object<Object>} bounds the result of calling map.getBounds().
   * @return {Array<Array>}
   */
  _formatBounds(bounds) {
    const sw = [
      Number(bounds['_sw']['lng']).toFixed(3),
      Number(bounds['_sw']['lat']).toFixed(3),
    ];
    const ne = [
      Number(bounds['_sw']['lng']).toFixed(3),
      Number(bounds['_sw']['lat']).toFixed(3),
    ];
    return [sw, ne];
  }

  /**
   * Prepares an object of map data that App component wants to know about.
   */
   _getMapData() {
     return {
       bounds : this._formatBounds(this._map.getBounds()),
       center : [ this._map.getCenter().lng, this._map.getCenter().lat ],
       zoom   : this._map.getZoom(),
     };
   }

  _listingToMarker(listing) {
    const infoWindowHTML = this._configureInfoWindowHTML(listing)

    const coordinates = [ listing.longitude, listing.latitude ];
    return {
        "type": "Feature",
        "properties": {
            "description" : infoWindowHTML,
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
              'base' : 1.75,
              'stops': [ [12, 5], [22, 180] ]
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

    // Create a popup, but don't add it to the map yet.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // Show popup on mousemove.
    // https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    this._map.on('mousemove', event => {
      this._updateCurrentListing(event.point);
    });
  }

  _updateCurrentListing(point) {
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

    // Notify App with 'MAP_POPUP_OPEN' event.
    // console.log(marker['properties']['listing']);
    this.props.emitter.emit('MAP_MARKER_HOVERED', {
      listing: JSON.parse(marker['properties']['listing'])
    });
  }

  _showPopupForCurrentListing() {
    const { currentListing } = this.props;

    if (this._popup) { this._popup.remove(); }

    const infoWindowHTML = this._configureInfoWindowHTML(currentListing)

    // https://www.mapbox.com/mapbox-gl-js/api/#Popup
    this._popup = new mapboxgl.Popup()
      .setLngLat([currentListing.longitude, currentListing.latitude])
      .setHTML(infoWindowHTML)
      .addTo(this._map);
  }

  /**
   * Moves the center of the map to the specified lngLat.
   * @param  {Array<Float>} longitude and latitude of the map center
   * @param  {Object} opts  https://www.mapbox.com/mapbox-gl-js/api/#Map
   */
  _updateCenter(newCenter, opts) {
    this._map.panTo(newCenter, opts);
  }

  _updateMarkers(listings) {
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
  bounds : T.array.isRequired,
  center : T.array.isRequired,
  zoom   : T.number.isRequired,
};

Map.defaultProps = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  width      : "100%",
  height     : "100vh",
};

export default Map;
