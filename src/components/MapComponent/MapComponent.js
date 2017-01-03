import React, { PropTypes as T } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl, ScaleControl } from "react-mapbox-gl"

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

  render() {
    const {
      center,
      zoom,
    } = this.props

    return (
      <div>
        <ReactMapboxGl
          accessToken={accessToken}
          style="mapbox://styles/mapbox/streets-v8"
          containerStyle={{ width: '100%', height: '100vh' }}
          center={center}
          zoom={[zoom]}
          onZoom={e => this._handleMapZoomChange(e)}
          onMoveEnd={e => this._handleMapMove(e)}
        >


        </ReactMapboxGl>
      </div>
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

  _handleMapMove(map) {
    const payload = this._getMapData(map)
    this.props.emitter.emit( 'MAP_MOVED', payload )
  }

} // end class

export default MapComponent
