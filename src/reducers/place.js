const initialState = {
  places      : [],
  currentPlace: {},
  fetchError    : null,
  isFetching    : false,
}

function place(state = initialState, action = {}) {
  const { places, place, error } = action

  switch (action.type) {

    case 'FETCH_ALL_PLACES_DONE':
      return {
        ...state,
        places,
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
        places,
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
        currentPlace: place
      }
    default:
      return state
  }
}

export default place
