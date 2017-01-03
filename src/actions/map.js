const actions = {

  update: ({bounds, center, zoom}) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP',
        bounds,
        center,
        zoom,
      });
    };
  },
  updateBounds: (bounds) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP_BOUNDS',
        bounds,
      });
    };
  },
  updateCenter: (center) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP_CENTER',
        center,
      });
    };
  },
  updateLatitude: (latitude) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP_LATITUDE',
        latitude,
      });
    };
  },
  updateLongitude: (longitude) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP_LONGITUDE',
        longitude,
      });
    };
  },
  updateZoom: (zoom) => {
    return dispatch => {
      dispatch({
        type: 'UPDATE_MAP_ZOOM',
        zoom,
      });
    };
  },
};

export default actions;
