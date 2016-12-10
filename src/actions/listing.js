import constants from '../constants/listing';
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
  fetchAll: () => {
    return (dispatch) => {
      dispatch({
        type: constants.SET_IS_FETCHING,
      });
      return (
        api.fetchAllListings()
          .then(res =>
            dispatch({
              type:     constants.FETCH_ALL_DONE,
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: constants.FETCH_ALL_FAIL,
              error,
            })
          )
      );
    };
  },
  fetchByKeyword: (q) => {
    return (dispatch) => {
      dispatch({
        type: constants.SET_IS_FETCHING,
      });
      return (
        api.fetchListingsByKeyword(q)
          .then(res =>
            dispatch({
              type:     constants.FETCH_BY_KEYWORD_DONE,
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: constants.FETCH_BY_KEYWORD_FAIL,
              error,
            })
          )
      );
    };
  },
};

export default listingActions;
