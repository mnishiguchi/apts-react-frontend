import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Layer, Feature, Popup, ScaleControl, ZoomControl } from "react-mapbox-gl"
import _ from 'lodash'

import universities from '../data/universities.json'

// Stored in .env file
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

/**
 * A map component powered by alex3165/react-mapbox-gl
 * https://github.com/alex3165/react-mapbox-gl
 */
class MapComponent extends React.PureComponent {
  render() {
    const {
      center,
      zoom,
      places,
      currentPlace,
      onMapZoom,
      onMapMoveEnd,
      onMarkerClick,
      onMarkerHover,
    } = this.props

    // console.info(universities)

    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{ width: '100%', height: '90vh' }}
        center={center}
        zoom={[zoom]}
        onZoom={onMapZoom}
        onMoveEnd={onMapMoveEnd}
        onStyleLoad={this._onStyleLoad.bind(this)}
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

  // https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#reactmapboxgl
  _onStyleLoad(map, event) {
    // Store ref to the map instance so that we can use original mapbox-gl API through window.
    window.map       = map
    window.mapCanvas = document.querySelector('.mapboxgl-canvas')
    window.mapDiv    = document.querySelector('.mapboxgl-map')

    // Define a utility to resize the map so that we can dynamically resize the map.
    window.resizeMap = function({width, height}) {
      if (width && height) {
        setMapWidth(width)
        setMapHeight(height)
        window.map.resize()
      } else if (width) {
        setMapWidth(width)
        window.map.resize()
      } else {
        setMapHeight(height)
        window.map.resize()
      }
    }

    fitMap()

    window.addEventListener('resize', () => {
      fitMap()
    })

    // Fit the map in the viewport.
    function fitMap() {
      const navbarHeight = 50
      window.resizeMap({ height: (window.innerHeight - navbarHeight) + 'px' })
    }

    function setMapWidth(width) {
      window.mapCanvas.style.width = width
      window.mapDiv.style.width    = width
    }

    function setMapHeight(height) {
      window.mapCanvas.style.height = height
      window.mapDiv.style.height    = height
    }
  }
} // end class

MapComponent.propTypes = {
  bounds:       PropTypes.array,
  center:       PropTypes.array,
  zoom:         PropTypes.number,
  currentPlace: PropTypes.object,
}

export default MapComponent
