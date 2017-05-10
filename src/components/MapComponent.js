import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Layer, Feature, Popup, ScaleControl, ZoomControl } from "react-mapbox-gl"
import _ from 'lodash'

// import universities from '../data/universities.json'
// import geojson from '../data/geojson.json'

import { buildGeojson } from '../lib/mapboxglUtils'

// Stored in .env file
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

/**
 * A reusable map component powered by alex3165/react-mapbox-gl
 * https://github.com/alex3165/react-mapbox-gl
 */
class MapComponent extends React.PureComponent {
  render() {
    const {
      center,
      containerStyle,
      currentPlace,
      places,
      zoom,
    } = this.props

    const onMapMoveEnd  = this.props.onMapMoveEnd  || (() => {})
    const onMapZoom     = this.props.onMapZoom     || (() => {})
    const onMarkerClick = this.props.onMarkerClick || (() => {})
    const onMarkerHover = this.props.onMarkerHover || (() => {})
    const onStyleLoad   = this.props.onStyleLoad   || (() => {})

    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{ width: '100%', height: '90vh', ...containerStyle }}
        center={center}
        zoom={[zoom]}
        onZoom={onMapZoom}
        onMoveEnd={onMapMoveEnd}
        onStyleLoad={onStyleLoad}
      >

        {/*
          External stylesheet does not work because buttons are inline-styled.
        */}
        <ZoomControl />

        <ScaleControl measurement="mi" position="bottomLeft" />

        {/*
          Circles (dots) for place
          https://www.mapbox.com/mapbox-gl-js/example/multiple-geometries/
        */}
        <Layer
          id="place-circle"
          type="circle"
          paint={{
            "circle-radius": 3,
            "circle-color":  "#f28cb1"
          }}
        >
          {
            places && places.map((place, index) => (
              <Feature
                key={place.id}
                coordinates={[ place.longitude, place.latitude ]}
                properties={{
                  'id': place.id,
                }}
              />
            ))
          }
        </Layer>

        {/*
          Icons for places
          https://www.mapbox.com/mapbox-gl-style-spec/#layout-symbol-icon-image
        */}
        <Layer
          id="place-symbol"
          type="symbol"
          layout={{
            // We can specify a symbol here for each marker.
            // Available icons: https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites/basic-v8/_svg
            "icon-image": "{icon}-15"
          }}
        >
          {
            places && places.map((place, index) => (
              <Feature
                key={place.id}
                coordinates={[ place.longitude, place.latitude ]}
                onClick={map => onMarkerClick(map, place)}
                onHover={map => onMarkerHover(map, place)}
                properties={{
                  // Used to dynamically determine icon
                  'icon': place.map['icon'],
                  'id':   place.id,
                }}
              />
            ))
          }
        </Layer>

        {
          // Popups for places
          // https://www.mapbox.com/mapbox-gl-js/api/#Popup
          !!(currentPlace) && (
            <Popup
              key={currentPlace.id}
              coordinates={[ currentPlace.longitude, currentPlace.latitude ]}
              offset={[ 20, -50 ]}
            >
              <p>{currentPlace.marketing_name}</p>
            </Popup>
          )
        }

        {
          // Information window for a currently-selected place
          !!(currentPlace) && (
            <div
              className="info-window"
              style={{
                position:   'fixed',
                bottom:     '0',
                left:       '0',
                zIndex:     '1234',
                width:      'inherit',
                height:     'auto',
                padding:    '1rem',
                background: 'rgba(0,0,0,.5)',
                color:      'white',
              }}
            >
              <div>
                <h4>{currentPlace.marketing_name}</h4>
                <p>{`${currentPlace.street} ${currentPlace.city} ${currentPlace.state} ${currentPlace.zip}`}</p>
              </div>
            </div>
          )
        }
      </ReactMapboxGl>
    )
  }
} // end class

MapComponent.propTypes = {
  bounds:        PropTypes.array,
  center:        PropTypes.array,
  currentPlace:  PropTypes.object,
  onMapZoom:     PropTypes.func,
  onMapMoveEnd:  PropTypes.func,
  onMarkerClick: PropTypes.func,
  onMarkerHover: PropTypes.func,
  onStyleLoad:   PropTypes.func,
  zoom:          PropTypes.number,
}

export default MapComponent
