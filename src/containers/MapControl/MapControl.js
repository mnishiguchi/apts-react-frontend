// import React          from 'react';
// import { connect }    from 'react-redux';
//
// // import listingActions from '../../actions/listing'
// import mapActions     from '../../actions/map'
//
// // Styles
// import './MapControl.css';
//
// const MapControl = (props) => {
//   const {
//     listings,
//     bounds,
//     center,
//     zoom,
//     dispatch
//   } = props;
//
//   return (
//     <form className="MapControl">
//       <div>
//         <strong>Listing count:</strong>{' '}
//         <span className="text-muted">
//           {listings.length}
//         </span>
//         {' / '}
//         <strong>Bounds:</strong>{' '}
//         <span className="text-muted">
//           {JSON.stringify(bounds)}
//         </span>
//       </div>
//       <label htmlFor="longitude">
//         Longitude:
//       </label>
//       <input
//         id="longitude"
//         type="number"
//         step="0.5"
//         value={Number(center[0]).toFixed(1)}
//         onChange={event => {
//           dispatch(mapActions.updateLongitude( event.target.value ));
//         }}
//       />
//       {' / '}
//       <label htmlFor="latitude">
//         Latitude:
//       </label>
//       <input
//         id="latitude"
//         type="number"
//         step="0.5"
//         value={Number(center[1]).toFixed(1)}
//         onChange={event => {
//           dispatch(mapActions.updateLatitude( event.target.value ));
//         }}
//       />
//       {' / '}
//       <label htmlFor="zoom">
//         Zoom:
//       </label>
//       <input
//         id="zoom"
//         type="number"
//         step="0.5"
//         value={Number(zoom).toFixed(1)}
//         onChange={event => {
//           dispatch(mapActions.updateZoom( event.target.value ));
//         }}
//       />
//     </form>
//   );
// }
//
// const mapStateToProps = function(store) {
//   return {
//     listings      : store.listing['listings'],
//     currentListing: store.listing['currentListing'],
//     bounds        : store.map['bounds'],
//     center        : store.map['center'],
//     zoom          : store.map['zoom'],
//   };
// }
//
// export default connect(mapStateToProps)(MapControl);
