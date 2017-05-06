import React from 'react'
import { AutoSizer, List } from 'react-virtualized'

import ListingPreview from './ListingPreview'
import ListingItem    from './ListingItem'

/**
 * A list of places.
 */
class Listing extends React.Component {
  render() {
    const { places, currentPlace } = this.props
    const navbarHeight = 50

    this._scrollToIndex = this._findIndex()

    // console.info(places)
    console.info(places.length + ' places')
    console.info(this._scrollToIndex)

    return (
      <div className="Listing">
        {/*
          <ListingPreview currentPlace={currentPlace} />
        */}

        {/*
          ## height
          - Set it to the expected height of the list.
          - If some other things occupy above or below the list, we must subtract it from height.
          Otherwise, some list elements will end up being hidden at the bottom.
          ## rowHeight
          - Each ListingItem component's height.
          ## scrollToIndex
          - An array index of the item we want to scroll to, or -1.
        */}
        <AutoSizer disableHeight>
          {
            ({ width, height }) => (
              <List
                ref={node => this.ListNode = node}
                width={width}
                height={window.innerHeight - navbarHeight}
                overscanRowCount={10}
                rowCount={places.length}
                rowHeight={80}
                rowRenderer={this._rowRenderer.bind(this)}
                noRowsRenderer={this._noRowsRenderer.bind(this)}
                scrollToIndex={this._scrollToIndex}
              />
            )
          }
        </AutoSizer>
      </div>
    )
  }

  /**
   * @return {integer} A list index of the currently selected place, or -1.
   */
  _findIndex() {
    const { places, currentPlace } = this.props
    return places.findIndex(place => {
      return (place && place.id) === (currentPlace && currentPlace.id)
    })
  }

  _rowRenderer({ index, key, style }) {
    const { emitter, places } = this.props
    return (
      <div key={key} style={style}>
        <ListingItem
          emitter={emitter}
          place={places[index]}
          active={index === this._scrollToIndex}
          index={index}
        />
      </div>
    )
  }

  _noRowsRenderer() {
    return (
      <div className="no-rows">
        No rows
      </div>
    )
  }
}

export default Listing
