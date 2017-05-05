import React from 'react'
import { AutoSizer, List } from 'react-virtualized'

import ListingPreview from './ListingPreview'
import ListingItem    from './ListingItem'

class Listing extends React.Component {
  render() {
    const { places, currentPlace } = this.props

    console.info(places.length + ' places')

    return (
      <div className="Listing">

        <ListingPreview currentPlace={currentPlace} />

        {/*
          height: Set it to an arbitrary value that is high enough. Then on componentDidMount, adjust it to the mapboxgl-map's height.
          rowHeight: Match it with the ListingItem component's height.
        */}
        <AutoSizer disableHeight>
          {({ width, height }) => (
            <List
              ref={node => this.ListNode = node}
              width={width}
              height={800}
              overscanRowCount={10}
              rowCount={places.length}
              rowHeight={60}
              rowRenderer={this._rowRenderer.bind(this)}
              noRowsRenderer={this._noRowsRenderer.bind(this)}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

  _rowRenderer({ index, key, style }) {
    const { emitter, places } = this.props
    return (
      <div key={key} style={style}>
        <ListingItem emitter={emitter} place={places[index]} />
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

  componentDidMount() {
    // Set the list's height to the same as map's height.
    document.querySelector('.ReactVirtualized__Grid').style.height = document.querySelector('.mapboxgl-map').style.height
  }
}

export default Listing
