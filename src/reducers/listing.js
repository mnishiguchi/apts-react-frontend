const initialState = {
  listings      : [],
  currentListing: {},
  fetchError    : null,
  isFetching    : false,
}

function listing(state = initialState, action = {}) {
  const { listings, listing, error } = action

  switch (action.type) {

    case 'FETCH_ALL_LISTINGS_DONE':
      return {
        ...state,
        listings,
        currentListing: null,
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_ALL_LISTINGS_FAIL':
      return {
        ...state,
        fetchError    : error,
        isFetching    : false,
      }
    case 'FETCH_LISTINGS_BY_KEYWORD_DONE':
      return {
        ...state,
        listings,
        currentListing: {},
        fetchError    : null,
        isFetching    : false,
      }
    case 'FETCH_LISTINGS_BY_KEYWORD_FAIL':
      return {
        ...state,
        fetchError    : error,
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
        currentListing: listing
      }
    default:
      return state
  }
}

export default listing
