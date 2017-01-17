import request from 'axios'

const api = {}

api.fetchAllPlaces = () => {
  return request.get(`https://apts-app.herokuapp.com/properties.json`, {
    responseType: 'json'
  })
}

api.fetchPlaceById = (id) => {
  return request.get(`https://apts-app.herokuapp.com/properties/${id}.json`, {
    responseType: 'json'
  })
}

api.fetchPlacesByKeyword = (q) => {
  return request.get(`https://apts-app.herokuapp.com/properties?q=${q}.json`, {
    responseType: 'json'
  })
}

export default api
