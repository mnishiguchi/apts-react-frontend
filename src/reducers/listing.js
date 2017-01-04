const initialState = {
  listings      : [],
  currentPlace: {},
  fetchError    : null,
  isFetching    : false,
}

function listing(state = initialState, action = {}) {
  const { listings, listing, error } = action

  switch (action.type) {

    case 'FETCH_ALL_PLACES_DONE':
      return {
        ...state,
        listings,
        currentPlace: null,
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_ALL_PLACES_FAIL':
      return {
        ...state,
        fetchError    : error,
        isFetching    : false,
      }
    case 'FETCH_PLACES_BY_KEYWORD_DONE':
      return {
        ...state,
        listings,
        currentPlace: {},
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_PLACES_BY_KEYWORD_FAIL':
      return {
        ...state,
        fetchError    : error,
        isFetching    : false,
      }
    case 'SET_IS_FETCHING_PLACES':
      return {
        ...state,
        isFetching: true
      }
    case 'SET_CURRENT_PLACE':
      return {
        ...state,
        currentPlace: listing
      }
    default:
      return state
  }
}

export default listing
