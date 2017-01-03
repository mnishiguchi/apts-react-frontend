const initialState = {
  bounds        : [],
  center        : [-95.7129, 37.0902], // [-77.2, 38.85]
  zoom          : 3,                   // 8
}

function map(state = initialState, action = {}) {

  const { bounds, center, zoom, longitude, latitude } = action

  switch (action.type) {

    case 'UPDATE_MAP':
      return {
        ...state,
        bounds,
        center,
        zoom,
      }
    case 'UPDATE_MAP_BOUNDS':
      return {
        ...state,
        bounds,
      }
    case 'UPDATE_MAP_CENTER':
      return {
        ...state,
        center,
      }
    case 'UPDATE_MAP_LATITUDE':
      return {
        ...state,
        center: [ state.center[0], latitude ]
      }
    case 'UPDATE_MAP_LONGITUDE':
      return {
        ...state,
        center: [ longitude, state.center[1] ],
      }
    case 'UPDATE_MAP_ZOOM':
      return {
        ...state,
        zoom,
      }
    default:
      return state
  }
}

export default map
