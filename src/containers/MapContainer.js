// import React       from 'react'
// import { connect } from 'react-redux'
//
// import mapActions   from '../../actions/map'
// import placeActions from '../../actions/place'
//
// import MapComponent from '../../components/MapComponent'
//
// function mapStateToProps(store) {
//   const { places, currentPlace } = store.place
//   const { bounds, center, zoom } = store.map
//
//   return {
//     places,
//     currentPlace,
//     bounds,
//     center,
//     zoom,
//   }
// }
//
// class MapContainer extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <div className="MapContainer">
//
//         <MapComponent/>
//
//         {this._renderChildrenWithProps()}
//       </div>
//     )
//   }
//
//   _renderChildrenWithProps() {
//     const { children } = this.props
//
//     const propsForChildren = {
//       setMapDimensions: (dimensions) => this.setMapDimensions(dimensions)
//     }
//
//     return children ? React.cloneElement(children, propsForChildren) : null
//   }
//
//   positionMapComponent() {
//     // Set the map center to the current places.
//     this.props.dispatch(
//       mapActions.updateCenter([
//         this.props.currentPlace.longitude || -77.0365,
//         this.props.currentPlace.latitude || 38.8977,
//       ])
//     )
//   }
// }
//
// export default connect( mapStateToProps, null )( MapContainer )
