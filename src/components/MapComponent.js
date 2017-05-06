import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl"
import _ from 'lodash'

import universities from '../data/universities.json'

// Stored in .env file
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

/**
 * A map component powered by alex3165/react-mapbox-gl
 * https://github.com/alex3165/react-mapbox-gl
 */
class MapComponent extends React.PureComponent {
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

    // console.info(universities)

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

        {/*
          University marker layer
        */}
        <Layer
          type="symbol" id="university"
          layout={{
            "icon-image": "school-11"
          }}
        >
          {
            universities.map((university, index) => (
              <Feature
                key={index}
                coordinates={[ university.longitude, university.latitude ]}
                onHover={map => this._handleUniversityHover(map, university)}
              />
            ))
          }
        </Layer>

        {/*
          Apartment marker layer
          https://www.mapbox.com/mapbox-gl-style-spec/#layout-symbol-icon-image
        */}
        <Layer
          type="symbol" id="marker"
          layout={{
            // We can specify a symbol here for each marker.
            // Available icons: https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites/basic-v8/_svg
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
                  // Used to dynamically determine marker-symbol
                  'marker-symbol': place.map.feature['marker-symbol'],
                }}
              />
            ))
          }
        </Layer>

        {
          // Popups for apartments
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

  _getMapData(map) {
    return {
      bounds: map.getBounds().toArray(),
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom:   map.getZoom(),
    }
  }

  _handleMapMove(map) {
    this.props.emitter.emit('MAP_MOVED', this._getMapData(map))
  }

  _handleMapZoomChange(map) {
    this.props.emitter.emit('MAP_ZOOM_CHANGED', this._getMapData(map))
  }

  _handleMarkerClick(map, place) {
    this.props.emitter.emit('MARKER_CLICKED', { place })
  }

  _handleMarkerHover(map, place) {
    this.props.emitter.emit('MARKER_HOVERED', { place })
  }

  _handleUniversityHover(map, university) {
    console.info('university hovered')
  }
} // end class

export default MapComponent
