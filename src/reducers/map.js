import constants from '../constants/map';

const initialState = {
  bounds            : [],
  center            : [-77.2, 38.85],
  zoom              : 12,
};

function mapReducer(state = initialState, action = {}) {
  const {
    type,
    bounds,
    center,
    latitude,
    longitude,
    zoom
  } = action;

  switch (action.type) {
    case constants.UPDATE_BOUNDS:
      return {
        ...state,
        bounds,
      };
    case constants.UPDATE_CENTER:
      return {
        ...state,
        center,
      };
    case constants.UPDATE_LATITUDE:
      return {
        ...state,
        center: [state.center[0], latitude]
      };
    case constants.UPDATE_LONGITUDE:
      return {
        ...state,
        center: [longitude, state.center[1]],
      };
    case constants.UPDATE_ZOOM:
      return {
        ...state,
        zoom,
      };
    default:
      return state;
  }
}

export default mapReducer
