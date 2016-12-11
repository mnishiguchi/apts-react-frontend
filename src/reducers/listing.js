import constants from '../constants/listing';

const initialState = {
  listings      : [],
  currentListing: {},
  fetchError    : null,
  isFetching    : false,
};

function listingReducer(state = initialState, action = {}) {
  const {
    type,
    listing,
    listings,
    error
  } = action;

  switch (type) {

    case constants.FETCH_ALL_DONE:
      return {
        ...state,
        listings      : listings,
        currentListing: null,
        fetchError    : null,
        isFetching    : false,
      };
    case constants.FETCH_ALL_FAIL:
      return {
        ...state,
        fetchError    : error,
        isFetching    : false,
      };
    case constants.FETCH_BY_KEYWORD_DONE:
      return {
        ...state,
        listings      : listings,
        currentListing: {},
        fetchError    : null,
        isFetching    : false,
      };
    case constants.FETCH_BY_KEYWORD_FAIL:
      return {
        ...state,
        fetchError    : error,
        isFetching    : false,
      };
    case constants.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case constants.SET_CURRENT_LISTING:
      return {
        ...state,
        currentListing: listing
      };
    default:
      return state;
  }
}

export default listingReducer
