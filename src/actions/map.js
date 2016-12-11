import constants from '../constants/map';

const mapActions = {

  updateBounds: (bounds) => {
    return dispatch => {
      dispatch({
        type: constants.UPDATE_BOUNDS,
        bounds,
      });
    };
  },
  updateCenter: (center) => {
    return dispatch => {
      dispatch({
        type: constants.UPDATE_CENTER,
        center,
      });
    };
  },
  updateLatitude: (latitude) => {
    return dispatch => {
      dispatch({
        type: constants.UPDATE_LATITUDE,
        latitude,
      });
    };
  },
  updateLongitude: (longitude) => {
    return dispatch => {
      dispatch({
        type: constants.UPDATE_LONGITUDE,
        longitude,
      });
    };
  },
  updateZoom: (zoom) => {
    return dispatch => {
      dispatch({
        type: constants.UPDATE_ZOOM,
        zoom,
      });
    };
  },
};

export default mapActions;
