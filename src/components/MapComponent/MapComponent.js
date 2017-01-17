import React, { PropTypes as T } from 'react'
import { connect }               from 'react-redux'

import mapActions   from '../../actions/map'
import placeActions from '../../actions/place'

import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl"
import _ from 'lodash'

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class MapComponent extends React.Component {
  static propTypes = {
    bounds      : T.array.isRequired,
    center      : T.array.isRequired,
    zoom        : T.number.isRequired,
    currentPlace: T.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      width:  this.props.width || '100%',
      height: this.props.height || '100vh',
    }
  }

  // ---
  // TEMPLATE
  // ---


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
          <p>{`${place.street} ${place.city} ${place.state} ${place.zip}`}</p>
        </div>
      </Popup>
    )
  }

  render() {
    const {
      center,
      zoom,
      places,
      currentPlace,
    } = this.props

    const {
      width,
      height
    } = this.state

    return (
      <ReactMapboxGl
        accessToken={accessToken}
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{ width, height }}
        center={center}
        zoom={[zoom]}
        onZoom={e => this._handleMapZoomChange(e)}
        onMoveEnd={e => this._handleMapMove(e)}
      >
        {/* https://www.mapbox.com/mapbox-gl-style-spec/#layout-symbol-icon-image */}
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}
        >
          {this._renderMarkers(places)}
        </Layer>

        {this._renderPopup(currentPlace)}
      </ReactMapboxGl>
    )
  }


  // ---
  // PRIVATE METHODS
  // ---


  _getMapData(map) {
    return {
      bounds : map.getBounds().toArray(),
      center : [ map.getCenter().lng, map.getCenter().lat ],
      zoom   : map.getZoom(),
    }
  }

  _handleMapMove(map) {
    const { dispatch } = this.props
    dispatch(
      mapActions.update(this._getMapData(map))
    )
  }

  _handleMapZoomChange(map) {
    const { dispatch } = this.props
    dispatch(
      mapActions.update(this._getMapData(map))
    )
  }

  _handleMarkerClick(e, place) {
    const { dispatch } = this.props
    dispatch(
      placeActions.setCurrentPlace(place)
    )
  }

  _handleMarkerHover(e, place) {
    const { dispatch } = this.props
    dispatch(
      placeActions.setCurrentPlace(place)
    )
  }
} // end class


// ---
// CONNECT TO STORE
// ---


const mapStateToProps = function(store) {
  const { places, currentPlace } = store.place

  return {
    places,
    currentPlace,
  }
}

const mapDispatchToProps = null

export default connect( mapStateToProps, mapDispatchToProps )( MapComponent )
