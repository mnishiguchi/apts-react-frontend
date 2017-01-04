import request from 'axios';

const API_URL = 'https://apts-app.herokuapp.com/properties.json';

const requestsManager = {

  fetchAllPlaces: () => {
    return request.get(API_URL, { responseType: 'json' });
  },
  fetchPlaceById: (id) => {
    return request.get(`${API_URL}/${id}`, { responseType: 'json' });
  },
  fetchPlacesByKeyword: (q) => {
    return request.get(`${API_URL}?q=${q}`, { responseType: 'json' });
  },
};

export default requestsManager;
