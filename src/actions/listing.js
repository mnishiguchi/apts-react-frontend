import api from '../lib/requestsManager';

const actions = {

  setCurrentPlace: (listing) => {
    return dispatch => {
      dispatch({
        type: 'SET_CURRENT_PLACE',
        listing
      });
    };
  },
  fetchAllPlaces: () => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_PLACES',
      });
      return (
        api.fetchAllPlaces()
          .then(res =>
            dispatch({
              type:     'FETCH_ALL_PLACES_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_ALL_PLACES_FAIL',
              error,
            })
          )
      );
    };
  },
  fetchPlacesByKeyword: (q) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_PLACES',
      });
      return (
        api.fetchPlacesByKeyword(q)
          .then(res =>
            dispatch({
              type:     'FETCH_PLACES_BY_KEYWORD_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_PLACES_BY_KEYWORD_FAIL',
              error,
            })
          )
      );
    };
  },
  fetchPlaceById: () => {
    return (dispatch) => {
      dispatch({
        type: 'SET_IS_FETCHING_PLACES',
      });
      return (
        api.fetchPlaceById()
          .then(res =>
            dispatch({
              type:     'FETCH_PLACE_BY_ID_DONE',
              listings: res.data,
            })
          )
          .catch(error =>
            dispatch({
              type: 'FETCH_PLACE_BY_ID_FAIL',
              error,
            })
          )
      );
    };
  },
};

export default actions;
