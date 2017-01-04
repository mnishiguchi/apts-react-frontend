const initialState = {
  listings      : [],
  currentListing: {},
  fetchError    : null,
  isFetching    : false,
  bounds        : [],
  center        : [-95.7129, 37.0902],
  zoom          : 3,
  // center        : [-77.2, 38.85],
  // zoom          : 8,
}

function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case 'FETCH_ALL_LISTINGS_DONE':
      return {
        ...state,
        listings      : action.listings,
        currentListing: null,
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_ALL_LISTINGS_FAIL':
      return {
        ...state,
        fetchError    : action.error,
        isFetching    : false,
      }
    case 'FETCH_LISTINGS_BY_KEYWORD_DONE':
      return {
        ...state,
        listings      : action.listings,
        currentListing: {},
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_LISTINGS_BY_KEYWORD_FAIL':
      return {
        ...state,
        fetchError    : action.error,
        isFetching    : false,
      }
    case 'SET_IS_FETCHING_LISTINGS':
      return {
        ...state,
        isFetching: true
      }
    case 'SET_CURRENT_LISTING':
      return {
        ...state,
        currentListing: action.listing
      }
    case 'UPDATE_MAP':
      return {
        ...state,
        bounds: action.bounds,
        center: action.center,
        zoom  : action.zoom,
      }
    case 'UPDATE_MAP_BOUNDS':
      return {
        ...state,
        bounds: action.bounds,
      }
    case 'UPDATE_MAP_CENTER':
      return {
        ...state,
        center: action.center,
      }
    case 'UPDATE_MAP_LATITUDE':
      return {
        ...state,
        center: [state.center[0], action.latitude]
      }
    case 'UPDATE_MAP_LONGITUDE':
      return {
        ...state,
        center: [action.longitude, state.center[1]],
      }
    case 'UPDATE_MAP_ZOOM':
      return {
        ...state,
        zoom: action.zoom,
      }
    default:
      return state
  }
}

export default reducer
