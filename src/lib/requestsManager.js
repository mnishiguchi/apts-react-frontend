import request from 'axios';

const API_URL = 'https://apts-app.herokuapp.com/properties.json';

const requestsManager = {

  fetchAllListings: () => {
    console.log(`fetchAllListings`)
    return request.get(API_URL, { responseType: 'json' });
  },
  fetchLisingById: (id) => {
    console.log(`fetchLisingById`)
    return request.get(`${API_URL}/${id}`, { responseType: 'json' });
  },
  fetchListingsByKeyword: (q) => {
    console.log(`fetchListingsByKeywords`)
    return request.get(`${API_URL}?q=${q}`, { responseType: 'json' });
  },
};

export default requestsManager;
