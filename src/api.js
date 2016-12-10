// import request from 'axios';
//
// const api = {
//   fetchAllListings,
//   fetchListingsByKeyword
// };
//
// // Make a GET request to our Rails server.
// function fetchAllListings() {
//   return (
//     request
//       .get("https://apts-app.herokuapp.com/properties.json", { responseType: 'json' })
//       .then(res => { console.log(res); })
//       .catch(error => { console.log(error); })
//   );
// }
//
//
// // Make a GET request to our Rails server.
// function fetchListingsByKeyword(q) {
//   return (
//     request
//       .get(`https://apts-app.herokuapp.com/properties.json?q=${q}`, { responseType: 'json' })
//       .then(res => { console.log(res); })
//       .catch(error => { console.log(error); })
//   );
// }
//
// export default API;
