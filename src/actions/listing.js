import api       from '../lib/requestsManager';

const actions = {

  setCurrentListing: (listing) => {
    return dispatch => {
      dispatch({
        type: 'SET_CURRENT_LISTING',
        listing
      });
    };
  },
  fetchAllListings: () => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_LISTINGS',
      });
      return (
        api.fetchAllListings()
          .then(res =>
            dispatch({
              type:     'FETCH_ALL_LISTINGS_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_ALL_LISTINGS_FAIL',
              error,
            })
          )
      );
    };
  },
  fetchListingsByKeyword: (q) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_LISTINGS',
      });
      return (
        api.fetchListingsByKeyword(q)
          .then(res =>
            dispatch({
              type:     'FETCH_LISTINGS_BY_KEYWORD_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_LISTINGS_BY_KEYWORD_FAIL',
              error,
            })
          )
      );
    };
  },
  fetchListingById: () => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_LISTINGS',
      });
      return (
        api.fetchListingById()
          .then(res =>
            dispatch({
              type:     'FETCH_LISTING_BY_ID_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_LISTING_BY_ID_FAIL',
              error,
            })
          )
      );
    };
  },
};

export default actions;
