import React                from 'react'
import { connect }          from 'react-redux'
import { EventEmitter }     from 'fbemitter'
import _                    from 'lodash'

import MapComponent from '../components/MapComponent'
import Listing      from '../components/Listing'

import actions from '../actions'

class ListingScreen extends React.Component {
  render() {
    return (
      <div className="ListingScreen">
        <div className="left">

          <MapComponent {...this.props} emitter={this.emitter} />

        </div>
        <div className="right">

          <Listing {...this.props} emitter={this.emitter} />

        </div>
      </div>
    )
  }

  componentWillMount() {
    // Create a emitter for this container.
    this.emitter = new EventEmitter()

    this.subscribeEvents()
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(
      actions.place.fetchAllPlaces()
    )

    // Prevent scroll.
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners()

    // Undo the scroll prevention.
    document.body.style.overflowX = ''
    document.body.style.overflowY = ''
  }

  subscribeEvents() {
    this.emitter.addListener('MAP_MARKER_HOVERED', payload => {
      console.log(`MAP_MARKER_HOVERED`)

      this.props.dispatch(
        actions.place.setCurrentPlace(payload.place)
      )
    })

    this.emitter.addListener('MAP_MOVED', payload => {
      console.log(`MAP_MOVED`)

      this.props.dispatch(
        actions.map.update(payload)
      )
    })

    this.emitter.addListener('MARKER_CLICKED', payload => {
      console.log(`MARKER_CLICKED`)

      const { place } = payload

      this.props.dispatch(
        actions.place.setCurrentPlace(place)
      )
    })

    this.emitter.addListener('MARKER_HOVERED', payload => {
      console.log(`MARKER_HOVERED`)
      // noop
    })

    this.emitter.addListener('MAP_ZOOM_CHANGED', payload => {
      console.log(`MAP_ZOOM_CHANGED`)

      this.props.dispatch(
        actions.map.update(payload)
      )
    })

    this.emitter.addListener('LISTING_ITEM_HOVERED', payload => {
      console.log(`LISTING_ITEM_HOVERED`)

      const { place } = payload

      this.props.dispatch(
        actions.place.setCurrentPlace(place)
      )
    })

    this.emitter.addListener('LISTING_ITEM_MOUSE_LEAVE', payload => {
      console.log(`LISTING_ITEM_MOUSE_LEAVE`)
      // noop
    })
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

export default connect( mapStateToProps, null )( ListingScreen )
