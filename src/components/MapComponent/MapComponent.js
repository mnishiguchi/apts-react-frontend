import React, { PropTypes as T } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl"

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class MapComponent extends React.Component {
  static propTypes = {
    bounds : T.array.isRequired,
    center : T.array.isRequired,
    zoom   : T.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderMarkers = (places) => {
    return places.map((place, index) => (
      <Feature
        key={place.id}
        coordinates={[ place.longitude, place.latitude ]}
        onClick={e => this._handleMarkerClick(e, place)}
      />
    ))
  }

  render() {
    const {
      center,
      zoom,
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
          {this._renderMarkers(this.props.listings)}
        </Layer>
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

  _handleMapZoomChange(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_ZOOM_CHANGED', payload )
  }

  _handleMarkerClick(e, place) {
    const payload = { listing: place }
    this.props.emitter.emit( 'MARKER_CLICKED', payload )
  }

  _handleMapMove(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_MOVED', payload )
  }

} // end class

export default MapComponent
