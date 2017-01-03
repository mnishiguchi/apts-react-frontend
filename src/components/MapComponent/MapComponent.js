import React, { PropTypes as T } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl"
import _ from 'lodash'

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class MapComponent extends React.Component {
  static propTypes = {
    bounds        : T.array.isRequired,
    center        : T.array.isRequired,
    zoom          : T.number.isRequired,
    currentListing: T.object,
  }

  _renderMarkers = (places) => {
    return places.map((place, index) => (
      <Feature
        key={place.id}
        coordinates={[ place.longitude, place.latitude ]}
        onClick={e => this._handleMarkerClick(e, place)}
        onHover={e => this._handleMarkerHover(e, place)}
      />
    ))
  }

  _renderPopup = (place) => {
    if (_.isEmpty(place)) return null

    // https://www.mapbox.com/mapbox-gl-js/api/#Popup
    return (
      <Popup
        key={place.id}
        coordinates={[ place.longitude, place.latitude ]}
        offset={[20, -50]}
      >
        <div>
          <h4>{place.marketing_name}</h4>
          <p>{this._fullAddressOfPlace(place)}</p>
        </div>
      </Popup>
    )
  }

  render() {
    const {
      center,
      zoom,
      listings,
      currentListing,
    } = this.props

    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{ width: '100%', height: '100vh' }}
        center={center}
        zoom={[zoom]}
        onZoom={e => this._handleMapZoomChange(e)}
        onMoveEnd={e => this._handleMapMove(e)}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}
        >
          {this._renderMarkers(listings)}
        </Layer>

        {this._renderPopup(currentListing)}
      </ReactMapboxGl>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {}
  componentWillReceiveProps(newProps) {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}


  // ---
  // PRIVATE METHODS
  // ---


  _fullAddressOfPlace = (place) => {
    return [
      place.street,
      place.city,
      place.state,
      place.zip,
    ].join(' ')
  }

  /**
   * Prepares an object of map data that App component wants to know about.
   */
  _getMapData(map) {
    return {
      bounds : map.getBounds().toArray(),
      center : [ map.getCenter().lng, map.getCenter().lat ],
      zoom   : map.getZoom(),
    };
  }

  _handleMapMove(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_MOVED', payload )
  }

  _handleMapZoomChange(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_ZOOM_CHANGED', payload )
  }

  _handleMarkerClick(e, place) {
    const payload = { listing: place }
    this.props.emitter.emit( 'MARKER_CLICKED', payload )
  }

  _handleMarkerHover(e, place) {
    const payload = { listing: place }
    this.props.emitter.emit( 'MARKER_HOVERED', payload )
  }

} // end class

export default MapComponent
