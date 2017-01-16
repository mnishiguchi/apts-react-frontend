const actions = {}

actions.update = ({bounds, center, zoom}) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP',
      bounds,
      center,
      zoom,
    })
  }
}

actions.updateBounds = (bounds) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP_BOUNDS',
      bounds,
    })
  }
}

actions.updateCenter = (center) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP_CENTER',
      center,
    })
  }
}

actions.updateLatitude = (latitude) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP_LATITUDE',
      latitude,
    })
  }
}

actions.updateLongitude = (longitude) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP_LONGITUDE',
      longitude,
    })
  }
}

actions.updateZoom = (zoom) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MAP_ZOOM',
      zoom,
    })
  }
}

export default actions
