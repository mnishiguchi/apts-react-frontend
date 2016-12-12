import constants from '../constants';
import api       from '../lib/requestsManager';

const listingActions = {

  setCurrentListing: (listing) => {
    return dispatch => {
      dispatch({
        type: constants.SET_CURRENT_LISTING,
        listing
      });
    };
  },
  fetchAllListings: () => {
    return (dispatch) => {
      dispatch({
        type: constants.SET_IS_FETCHING_LISTINGS,
      });
      return (
        api.fetchAllListings()
          .then(res =>
            dispatch({
              type:     constants.FETCH_ALL_LISTINGS_DONE,
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: constants.FETCH_ALL_LISTINGS_FAIL,
              error,
            })
          )
      );
    };
  },
  fetchListingsByKeyword: (q) => {
    return (dispatch) => {
      dispatch({
        type: constants.SET_IS_FETCHING_LISTINGS,
      });
      return (
        api.fetchListingsByKeyword(q)
          .then(res =>
            dispatch({
              type:     constants.FETCH_LISTINGS_BY_KEYWORD_DONE,
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: constants.FETCH_LISTINGS_BY_KEYWORD_FAIL,
              error,
            })
          )
      );
    };
  },
  fetchListingById: () => {
    return (dispatch) => {
      dispatch({
        type: constants.SET_IS_FETCHING_LISTINGS,
      });
      return (
        api.fetchListingById()
          .then(res =>
            dispatch({
              type:     constants.FETCH_LISTING_BY_ID_DONE,
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: constants.FETCH_LISTING_BY_ID_FAIL,
              error,
            })
          )
      );
    };
  },
};

export default listingActions;
