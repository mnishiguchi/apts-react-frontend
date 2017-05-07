import React            from 'react'
import { connect }      from 'react-redux'
import _                from 'lodash'

import MapComponent from '../components/MapComponent'
import Listing      from '../components/Listing'

import actions from '../actions'

class ListingScreen extends React.Component {
  render() {
    return (
      <div className="ListingScreen">
        <div className="left">

          <MapComponent
            {...this.props}
            onMapZoom={this.onMapZoom.bind(this)}
            onMapMoveEnd={this.onMapMoveEnd.bind(this)}
            onMarkerClick={this.onMarkerClick.bind(this)}
            onMarkerHover={this.onMarkerHover.bind(this)}
          />

        </div>
        <div className="right">

          <Listing
            {...this.props}
            onListingItemHover={this.onListingItemHover.bind(this)}
            onListingItemMouseLeave={this.onListingItemMouseLeave.bind(this)}
          />

        </div>
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(
      actions.place.fetchAllPlaces()
    )
  }

  componentDidMount() {
    // Prevent scroll.
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'
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
    // NOOP
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

  onListingItemMouseLeave(place) {
    console.log(`onListingItemMouseLeave`)
    // NOOP
  }
} // end class

function mapStateToProps(store) {
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

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( ListingScreen )
