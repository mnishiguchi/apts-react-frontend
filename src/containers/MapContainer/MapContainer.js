import React       from 'react'
import { connect } from 'react-redux'

import mapActions   from '../../actions/map'
import placeActions from '../../actions/place'

import MapComponent from '../../components/MapComponent/MapComponent'

const MAP_ORIG_SELECTOR = '#mapOrig'
const MAP_DEST_SELECTOR = '#mapDest'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width:  '100%',
      height: '90vh',
    }
  }

  render() {
    return (
      <div className="MapContainer">

        <div id="mapOrig">
          {/*
            - From here, MapComponent will be moved to the currently displayed view.
            - When the view is unmounted, MapComponent will be back here.
          */}
          <MapComponent
            {...this.props}
            width={this.state.width}
            height={this.state.height}
          />
        </div>

        {this._renderChildrenWithProps()}
      </div>
    )
  }

  _renderChildrenWithProps() {
    const { children } = this.props

    const propsForChildren = {
      positionMapComponent:   () => this.positionMapComponent(),
      unpositionMapComponent: () => this.unpositionMapComponent(),
      setMapDimensions: (dimensions) => this.setMapDimensions(dimensions)
    }

    return children ? React.cloneElement(children, propsForChildren) : null
  }

  positionMapComponent() {
    // Put the map in the appropriate position in the current page.
    const mapNode   = document.querySelector('.mapboxgl-map')
    const mapCanvas = document.querySelector('.mapboxgl-canvas')
    document.querySelector(MAP_DEST_SELECTOR).appendChild(mapNode)

    // Fire window resize event to trigger the map to resize.
    window.dispatchEvent(new Event('resize'))

    // Set the map center to the current place's.
    this.props.dispatch(
      mapActions.updateCenter([
        this.props.currentPlace.longitude || -77.0365,
        this.props.currentPlace.latitude || 38.8977,
      ])
    )
  }

  unpositionMapComponent() {
    const mapNode   = document.querySelector('.mapboxgl-map')
    document.querySelector(MAP_ORIG_SELECTOR).appendChild(mapNode)
  }
}


// ---
// CONNECT TO STORE
// ---


const mapStateToProps = function(store) {
  const { places, currentPlace } = store.place
  const { bounds, center, zoom } = store.map

  return {
    places,
    currentPlace,
    bounds,
    center,
    zoom,
  }
}

const mapDispatchToProps = null

export default connect( mapStateToProps, mapDispatchToProps )( MapContainer )
