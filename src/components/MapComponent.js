import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Layer, Feature, Popup, ScaleControl, ZoomControl, GeoJSONLayer } from "react-mapbox-gl"
import _ from 'lodash'

import universities from '../data/universities.json'
import geojson from '../data/geojson.json'

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

    // TODO: How to add cluster?
    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{ width: '100%', height: '90vh', ...containerStyle }}
        center={center}
        zoom={[zoom]}
        onZoom={onMapZoom}
        onMoveEnd={onMapMoveEnd}
        onStyleLoad={onStyleLoad}
      >

        {/*
          TODO: How to customize styles?
          External stylesheet does not work because buttons are inline-styled.
        */}
        <ZoomControl />

        <ScaleControl measurement="mi" position="bottomLeft" />

        {/*
          University marker layer
        */}
        <Layer
          type="symbol" id="university"
          layout={{ "icon-image": "school-11" }}
        >
          {
            universities.map((university, index) => (
              <Feature
                key={index}
                coordinates={[ university.longitude, university.latitude ]}
              />
            ))
          }
        </Layer>

        {/*
          Apartment marker layer
          https://www.mapbox.com/mapbox-gl-style-spec/#layout-symbol-icon-image
        */}
        <Layer
          type="symbol" id="apartment-symbol"
          layout={{
            // We can specify a symbol here for each marker.
            // Available icons: https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites/basic-v8/_svg
            "icon-image": "{marker-symbol}-15"
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
                  // Used to dynamically determine marker-symbol
                  'marker-symbol': place.map.feature['marker-symbol'],
                }}
              />
            ))
          }
        </Layer>

        {/*
          Example geojson layer
          https://github.com/alex3165/react-mapbox-gl/blob/master/example/src/geojson-example.js
          https://raw.githubusercontent.com/alex3165/react-mapbox-gl/master/example/src/geojson.json
        */}
        <GeoJSONLayer
          data={geojson}
          circleLayout={{ visibility: "visible" }}
          symbolLayout={{
            "text-field":  "{place}",
            "text-font":   ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }}/>

        {
          // Popups for apartments
          // https://www.mapbox.com/mapbox-gl-js/api/#Popup
          !!(currentPlace) && (
            <Popup
              key={currentPlace.id}
              coordinates={[ currentPlace.longitude, currentPlace.latitude ]}
              offset={[ 20, -50 ]}
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
