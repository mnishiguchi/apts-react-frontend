import request from 'axios';

const API_URL = 'https://apts-app.herokuapp.com/properties.json';

const requestsManager = {

  fetchAllListings: () => {
    return request.get(API_URL, { responseType: 'json' });
  },
  fetchListingById: (id) => {
    return request.get(`${API_URL}/${id}`, { responseType: 'json' });
  },
  fetchListingsByKeyword: (q) => {
    return request.get(`${API_URL}?q=${q}`, { responseType: 'json' });
  },
};

export default requestsManager;
