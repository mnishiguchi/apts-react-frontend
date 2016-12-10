import constants from '../constants';

const mapActions = {
  updateMap: () => {
    return dispatch => {
      dispatch({
        type: constants.MAP_UPDATE,
      });
    };
  },
};

export default mapActions;
