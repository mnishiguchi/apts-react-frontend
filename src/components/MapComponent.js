import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  ScaleControl,
  ZoomControl,
  // GeoJSONLayer
} from "react-mapbox-gl"
import _ from 'lodash'

// Stored in .env file
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

/**
 * A map component powered by alex3165/react-mapbox-gl
 * https://github.com/alex3165/react-mapbox-gl
 */
class MapComponent extends React.Component {
  static propTypes = {
    bounds:       PropTypes.array.isRequired,
    center:       PropTypes.array.isRequired,
    zoom:         PropTypes.number.isRequired,
    currentPlace: PropTypes.object,
  }

  render() {
    const {
      center,
      zoom,
      places,
      currentPlace,
    } = this.props

    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{ width: '100%', height: '80vh' }}
        center={center}
        zoom={[zoom]}
        onZoom={map => this._handleMapZoomChange(map)}
        onMoveEnd={map => this._handleMapMove(map)}
      >
        <ScaleControl/>
        <ZoomControl/>

        {/* https://www.mapbox.com/mapbox-gl-style-spec/#layout-symbol-icon-image */}
        <Layer
          type="symbol"
          id="marker"
          layout={{
            "icon-image": "{marker-symbol}-15"
          }}
        >
          {
            places.map((place, index) => (
              <Feature
                key={place.id}
                coordinates={[ place.longitude, place.latitude ]}
                onClick={map => this._handleMarkerClick(map, place)}
                onHover={map => this._handleMarkerHover(map, place)}
                properties={{
                  // We can specify a symbol here for each marker.
                  // Available icons: https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites/basic-v8/_svg
                  'marker-symbol': (index % 2) ? 'castle' : 'beer',
                }}
              />
            ))
          }
        </Layer>

        {
          // https://www.mapbox.com/mapbox-gl-js/api/#Popup
          currentPlace && (
            <Popup
              key={currentPlace.id}
              coordinates={[ currentPlace.longitude, currentPlace.latitude ]}
              offset={[20, -50]}
            >
              <div>
                <h4>{currentPlace.marketing_name}</h4>
                <p>{`${currentPlace.street} ${currentPlace.city} ${currentPlace.state} ${currentPlace.zip}`}</p>
              </div>
            </Popup>
          )
        }
      </ReactMapboxGl>
    )
  }

  // ---
  // PRIVATE METHODS
  // ---

  _getMapData(map) {
    return {
      bounds: map.getBounds().toArray(),
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom:   map.getZoom(),
    }
  }

  _handleMapMove(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_MOVED', payload )
  }

  _handleMapZoomChange(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_ZOOM_CHANGED', payload )
  }

  _handleMarkerClick(map, place) {
    const payload = { place: place }
    this.props.emitter.emit( 'MARKER_CLICKED', payload )
  }

  _handleMarkerHover(map, place) {
    const payload = { place: place }
    this.props.emitter.emit( 'MARKER_HOVERED', payload )
  }

} // end class

export default MapComponent
