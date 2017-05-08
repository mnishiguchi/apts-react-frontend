import React                from 'react'
import { connect }          from 'react-redux'
import { browserHistory }          from 'react-router'
import _                    from 'lodash'

import actions              from '../actions'
import Listing              from '../components/Listing'
import MapComponent         from '../components/MapComponent'
import { onStyleLoadMixin } from '../lib/mapboxglUtils'

// Define constants for toggling modes.
const LIST_MODE = 0
const MAP_MODE  = 1

/**
 * A container component that controls the map-listing widget.
 */
class ListingScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      mode:       LIST_MODE,
    }
  }

  render() {
    return (
      <div className="ListingScreen">

        <div className="left" style={{ zIndex: this.state.mode === MAP_MODE ? '10' : '1' }}>
          <MapComponent
            {...this.props}
            onMapMoveEnd={this.onMapMoveEnd.bind(this)}
            onMapZoom={this.onMapZoom.bind(this)}
            onMarkerClick={this.onMarkerClick.bind(this)}
            onMarkerHover={this.onMarkerHover.bind(this)}
            onStyleLoad={this.onStyleLoad.bind(this)}
          />
        </div>

        <div className="right" style={{ zIndex: this.state.mode === LIST_MODE ? '10' : '1' }}>
          <Listing
            {...this.props}
            onListingItemClick={this.onListingItemClick.bind(this)}
            onListingItemHover={this.onListingItemHover.bind(this)}
            onListingItemMouseLeave={this.onListingItemMouseLeave.bind(this)}
          />
        </div>

        <button
          className="toggle"
          style={{
            position:     'fixed',
            bottom:       '9px',
            right:        '20px',
            zIndex:       '1234',
            color:        'white',
            background:   'rgba(0,0,0,.6)',
            padding:      '5px',
            borderRadius: '50%',
          }}
          onClick={e => {
            this.setState((prevState, props) => {
              return { mode: prevState.mode === MAP_MODE ? LIST_MODE : MAP_MODE }
            })
          }}
        >
          { this.state.mode === MAP_MODE ? 'LIST' : 'MAP' }
        </button>
      </div>
    )
  }

  componentDidMount() {
    // Prevent scroll.
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'

    setToggleButton()

    window.addEventListener('resize', () => {
      setToggleButton()
    })

    // Set toggle for mobile, hide it for larger devices.
    function setToggleButton() {
      if (document.body.clientWidth < 600) {
        document.querySelector('.toggle').style.visibility = 'visible'
      } else {
        document.querySelector('.toggle').style.visibility = 'hidden'
      }
    }
  }

  componentWillUnmount() {
    // Undo the scroll prevention.
    document.body.style.overflowX = ''
    document.body.style.overflowY = ''
  }

  //---
  // EVENT HANDLERS
  //---

  onMapMoveEnd(map) {
    console.log(`onMoveEnd`)
    // NOOP
  }

  onMapZoom(map) {
    console.log(`onZoom`)

    const zoom = window.getMapData().zoom
    this.props.dispatch(
      actions.map.updateZoom(zoom)
    )
  }

  onMarkerClick(map, place) {
    console.log(`onMarkerClick`)

    this.props.dispatch(
      actions.place.setCurrentPlace(place)
    )
  }

  onMarkerHover(map, place) {
    console.log(`onMarkerHover`)
    // NOOP
  }

  onListingItemHover(place) {
    console.log(`onListingItemHover`)

    this.props.dispatch(
      actions.place.setCurrentPlace(place)
    )
  }

  onListingItemClick(place) {
    console.log(`onListingItemHover`)

    // Clear the selected place/
    this.props.dispatch(
      actions.place.setCurrentPlace(null)
    )

    // Go to detail page
    if (place && place.id) {
      browserHistory.push('/places/' + place.id)
    }
  }

  onListingItemMouseLeave(place) {
    console.log(`onListingItemMouseLeave`)
    // NOOP
  }

  // https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#reactmapboxgl
  onStyleLoad(map, event) {
    onStyleLoadMixin(map)

    // Initial map fitting.
    fitMap()

    // Map fitting on resize.
    window.addEventListener('resize', () => {
      fitMap()
    })

    // Fit the map appropriately for this page.
    function fitMap() {
      const navbarHeight = 50
      window.resizeMap({ height: (window.innerHeight - navbarHeight) + 'px' })
    }
  }
} // end class

function mapStateToProps(store) {
  const { places, currentPlace } = store.place
  const { bounds, center, zoom } = store.map

  return {
    bounds,
    center,
    currentPlace,
    places,
    zoom,
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( ListingScreen )
